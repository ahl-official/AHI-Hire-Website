/**
 * AHL Hire — Google Apps Script
 * ─────────────────────────────────────────────────────────────
 * SETUP INSTRUCTIONS:
 *
 * 1. Open your Google Spreadsheet.
 * 2. Create the following sheets (tabs) — names must match exactly:
 *      - AI Automation
 *      - Digital Marketing
 *      - Productions
 *      - Accounts
 *      - Technology
 *      - HR
 *      - Talent Pool
 *
 * 3. In the spreadsheet, go to Extensions > Apps Script.
 * 4. Paste this entire file into the editor, replacing any existing code.
 * 5. Click Save (💾).
 * 6. Click Deploy > New Deployment.
 *      - Type: Web App
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 7. Click Deploy, authorise when prompted.
 * 8. Copy the Web App URL.
 * 9. In your React project, open src/App.jsx and replace:
 *         const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
 *    with your copied URL.
 * ─────────────────────────────────────────────────────────────
 */

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// Column headers for service request sheets
const SERVICE_HEADERS = [
  "Timestamp", "Name", "Age", "Email", "Phone", "Service Type", "Details"
];

// Column headers for the talent pool sheet
const TALENT_HEADERS = [
  "Timestamp", "Name", "Age", "Email", "Phone",
  "Domain", "Experience", "Availability", "Location", "LinkedIn", "Bio"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheet || "Uncategorised";
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(sheetName);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = sheetName === "Talent Pool" ? TALENT_HEADERS : SERVICE_HEADERS;
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#0d1520")
        .setFontColor("#3b82f6");
    }

    // Build the row based on sheet type
    let row;
    if (sheetName === "Talent Pool") {
      row = [
        data.timestamp || new Date().toISOString(),
        data.name || "",
        data.age || "",
        data.email || "",
        data.phone || "",
        data.domain || "",
        data.experience || "",
        data.availability || "",
        data.location || "",
        data.linkedin || "",
        data.bio || ""
      ];
    } else {
      row = [
        data.timestamp || new Date().toISOString(),
        data.name || "",
        data.age || "",
        data.email || "",
        data.phone || "",
        data.serviceType || "",
        data.details || ""
      ];
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "AHL Hire API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
