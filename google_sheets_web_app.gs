const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Responses";

function doGet() {
  return jsonResponse({
    ok: true,
    message: "Lab 2 Google Sheets web app is running.",
    sheetName: SHEET_NAME,
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    if (!SHEET_ID || SHEET_ID === "PASTE_YOUR_GOOGLE_SHEET_ID_HERE") {
      throw new Error("Set SHEET_ID before deploying this Apps Script web app.");
    }

    const params = e && e.parameter ? e.parameter : {};
    const incomingHeaders = JSON.parse(params.headers_json || "[]");
    const rowObject = JSON.parse(params.row_json || "{}");

    if (!incomingHeaders.length) {
      throw new Error("No headers_json payload was received.");
    }

    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    const headers = ensureHeaders(sheet, incomingHeaders);
    const values = headers.map((header) => sanitizeCell(rowObject[header]));

    upsertBySessionId(sheet, headers, values, rowObject.session_id);

    return jsonResponse({
      ok: true,
      status: "stored",
      session_id: rowObject.session_id || "",
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders(sheet, incomingHeaders) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, incomingHeaders.length).setValues([incomingHeaders]);
    return incomingHeaders;
  }

  const existingHeaders = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
    .getValues()[0]
    .map(String);

  const mergedHeaders = existingHeaders.filter(Boolean);
  incomingHeaders.forEach((header) => {
    if (!mergedHeaders.includes(header)) {
      mergedHeaders.push(header);
    }
  });

  if (mergedHeaders.length !== existingHeaders.filter(Boolean).length) {
    sheet.getRange(1, 1, 1, mergedHeaders.length).setValues([mergedHeaders]);
  }

  return mergedHeaders;
}

function upsertBySessionId(sheet, headers, values, sessionId) {
  if (!sessionId) {
    sheet.appendRow(values);
    return;
  }

  const sessionIdColumn = headers.indexOf("session_id") + 1;
  if (!sessionIdColumn) {
    sheet.appendRow(values);
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    sheet.appendRow(values);
    return;
  }

  const existingSessionIds = sheet
    .getRange(2, sessionIdColumn, lastRow - 1, 1)
    .getValues()
    .map(function(row) {
      return String(row[0]);
    });

  const existingIndex = existingSessionIds.indexOf(String(sessionId));
  if (existingIndex === -1) {
    sheet.appendRow(values);
    return;
  }

  const targetRow = existingIndex + 2;
  sheet.getRange(targetRow, 1, 1, headers.length).setValues([values]);
}

function sanitizeCell(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  const text = String(value);
  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }
  return text;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
