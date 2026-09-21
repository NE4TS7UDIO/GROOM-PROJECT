# Google Sheet integration setup

The site writes every submission (stage 1 karting RSVP and stage 2 "yes") to
`POST /api/submit`, a Next.js route handler at
[src/app/api/submit/route.ts](../src/app/api/submit/route.ts). That route
forwards each submission to a Google Apps Script Web App bound to the
response sheet, via the `SHEETS_WEBHOOK_URL` env var. If the var isn't set,
submissions are just logged server-side and the site still works — this
integration is additive, not required for the site to function.

## 1. Create the sheet

New Google Sheet, one tab named `Responses`, header row:

```
name | karting_rsvp | karting_submitted_at | groomsman_answer | groomsman_submitted_at
```

(Matches the column layout in `docs/site-spec.md`.)

## 2. Add the Apps Script

Extensions → Apps Script, replace the default code with:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
  const data = JSON.parse(e.postData.contents);
  const rows = sheet.getDataRange().getValues();
  const rowIndex = rows.findIndex((r) => r[0] === data.name);

  if (data.stage === "karting") {
    if (rowIndex === -1) {
      sheet.appendRow([data.name, data.karting_rsvp, data.submitted_at, "", ""]);
    } else {
      sheet.getRange(rowIndex + 1, 2, 1, 2).setValues([[data.karting_rsvp, data.submitted_at]]);
    }
  } else if (data.stage === "groomsman") {
    if (rowIndex === -1) {
      sheet.appendRow([data.name, "", "", data.groomsman_answer, data.submitted_at]);
    } else {
      sheet.getRange(rowIndex + 1, 4, 1, 2).setValues([[data.groomsman_answer, data.submitted_at]]);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Matching by typed name means a second submission from the same person
(e.g. revisiting the page) updates their existing row instead of adding a
duplicate.

## 3. Deploy as a Web App

Deploy → New deployment → type **Web app**.
- Execute as: **Me**
- Who has access: **Anyone**

Copy the deployment URL (ends in `/exec`).

## 4. Wire it into the site

Copy `.env.example` to `.env.local` and set:

```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
```

Restart `next dev` (or redeploy) after adding it.
