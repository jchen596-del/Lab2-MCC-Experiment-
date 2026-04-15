param(
  [int]$Width = 1600,
  [int]$Height = 900,
  [string]$Root = (Split-Path -Parent $PSCommandPath)
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$bg = [System.Drawing.Color]::FromArgb(238, 243, 248)

function Save-NormalizedImage {
  param(
    [string]$SourcePath,
    [string]$DestinationPath,
    [int]$CanvasWidth,
    [int]$CanvasHeight,
    [System.Drawing.Color]$BackgroundColor
  )

  $source = [System.Drawing.Image]::FromFile($SourcePath)
  try {
    $scale = [Math]::Min($CanvasWidth / $source.Width, $CanvasHeight / $source.Height)
    $drawWidth = [int][Math]::Round($source.Width * $scale)
    $drawHeight = [int][Math]::Round($source.Height * $scale)
    $offsetX = [int][Math]::Floor(($CanvasWidth - $drawWidth) / 2)
    $offsetY = [int][Math]::Floor(($CanvasHeight - $drawHeight) / 2)

    $canvas = New-Object System.Drawing.Bitmap($CanvasWidth, $CanvasHeight)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($canvas)
      try {
        $graphics.Clear($BackgroundColor)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($source, $offsetX, $offsetY, $drawWidth, $drawHeight)

        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)
        $canvas.Save($DestinationPath, $encoder, $params)
      } finally {
        $graphics.Dispose()
      }
    } finally {
      $canvas.Dispose()
    }
  } finally {
    $source.Dispose()
  }
}

$targets = @(
  @{ Source = (Join-Path $Root "media\images\c2"); Destination = (Join-Path $Root "media\images\web\c2") },
  @{ Source = (Join-Path $Root "media\images\c3"); Destination = (Join-Path $Root "media\images\web\c3") }
)

foreach ($target in $targets) {
  New-Item -ItemType Directory -Force -Path $target.Destination | Out-Null
  Get-ChildItem $target.Source -Filter *.jpg | ForEach-Object {
    $destPath = Join-Path $target.Destination $_.Name
    Save-NormalizedImage -SourcePath $_.FullName -DestinationPath $destPath -CanvasWidth $Width -CanvasHeight $Height -BackgroundColor $bg
  }
}

Write-Host "Normalized listening images to ${Width}x${Height} in media\\images\\web."
