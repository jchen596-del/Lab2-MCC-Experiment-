# Google Sheets Live Setup

This experiment can submit directly into a live Google Sheet through a Google Apps Script web app.

## Files
- [google_sheets_web_app.gs](C:\Users\JayCh\ASU Dropbox\Jie Chen\Research\Text to video\material\misq\Lab2\experiment\google_sheets_web_app.gs)

## Setup
1. Create a new Google Sheet.
2. Copy the sheet ID from its URL.
3. Open [script.new](https://script.new) and paste the contents of `google_sheets_web_app.gs`.
4. Replace `SHEET_ID` with your actual Google Sheet ID.
5. In Apps Script, deploy it as a Web App.
6. Use:
   Execute as: `Me`
   Who has access: `Anyone`
7. Copy the deployed Web App URL.
8. Open the experiment with:
   `index.html?sheet=YOUR_WEB_APP_URL`

## Notes
- The website sends a flat row of data plus the full JSON payload.
- The Apps Script creates headers automatically the first time it receives data.
- If the same `session_id` is submitted again, the script updates the existing row instead of appending a duplicate.
- Preview mode still works with:
  `index.html?preview=1&condition=C2&sheet=YOUR_WEB_APP_URL`
