param(
  [int]$Port = 8080,
  [string]$Root = (Split-Path -Parent $PSCommandPath)
)

$ErrorActionPreference = "Stop"

$resolvedRoot = [System.IO.Path]::GetFullPath($Root)
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()

Write-Host "Serving $resolvedRoot at http://localhost:$Port/"

$contentTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif" = "image/gif"
  ".svg" = "image/svg+xml"
  ".mp3" = "audio/mpeg"
  ".wav" = "audio/wav"
  ".txt" = "text/plain; charset=utf-8"
}

function Send-Response {
  param(
    [System.IO.Stream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $headers = @(
    "HTTP/1.1 $StatusCode $StatusText",
    "Content-Type: $ContentType",
    "Content-Length: $($Body.Length)",
    "Connection: close",
    ""
  ) -join "`r`n"

  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers + "`r`n")
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)

      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        continue
      }

      while ($true) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($line)) { break }
      }

      $parts = $requestLine.Split(" ")
      if ($parts.Length -lt 2) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Bad Request")
        Send-Response -Stream $stream -StatusCode 400 -StatusText "Bad Request" -Body $body
        continue
      }

      $method = $parts[0]
      $rawPath = $parts[1]
      if ($method -ne "GET") {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Method Not Allowed")
        Send-Response -Stream $stream -StatusCode 405 -StatusText "Method Not Allowed" -Body $body
        continue
      }

      $pathOnly = ($rawPath -split "\?")[0]
      $relativePath = [System.Uri]::UnescapeDataString($pathOnly.TrimStart("/"))
      if ([string]::IsNullOrWhiteSpace($relativePath)) {
        $relativePath = "index.html"
      }

      $candidate = Join-Path $resolvedRoot $relativePath
      if ((Test-Path $candidate) -and (Get-Item $candidate).PSIsContainer) {
        $candidate = Join-Path $candidate "index.html"
      }

      $resolvedCandidate = [System.IO.Path]::GetFullPath($candidate)
      if (-not $resolvedCandidate.StartsWith($resolvedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
        Send-Response -Stream $stream -StatusCode 403 -StatusText "Forbidden" -Body $body
        continue
      }

      if (-not (Test-Path $resolvedCandidate) -or (Get-Item $resolvedCandidate).PSIsContainer) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        Send-Response -Stream $stream -StatusCode 404 -StatusText "Not Found" -Body $body
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($resolvedCandidate)
      $extension = [System.IO.Path]::GetExtension($resolvedCandidate).ToLowerInvariant()
      $contentType = $contentTypes[$extension]
      if (-not $contentType) {
        $contentType = "application/octet-stream"
      }

      Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -Body $bytes -ContentType $contentType
    } catch {
      if ($stream) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Server Error")
        Send-Response -Stream $stream -StatusCode 500 -StatusText "Server Error" -Body $body
      }
    } finally {
      if ($reader) { $reader.Dispose() }
      if ($stream) { $stream.Dispose() }
      $client.Dispose()
    }
  }
} finally {
  $listener.Stop()
}
