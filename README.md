# Lab 2 Experiment Website

This folder contains the active static website for the Lab 2 Multimodal Cognitive Conflict experiment.

## Active Files
- `index.html` - entry page for the experiment
- `styles.css` - layout, typography, and responsive styling
- `lab2-c3-transition-config.js` - editable C3 transition sentences and optional exact image-switch times
- `c3-transition-timing-helper.html` - helper page for manually capturing exact C3 transition times while listening
- `lab2-data.js` - lecture content, question banks, and scale items
- `lab2-views-intro.js` - consent, eligibility, background questionnaire, and instructions screens
- `lab2-views-study.js` - lecture playback, comprehension, post-lecture survey, and break screens
- `lab2-views-finish.js` - final questionnaire, debrief, export, and completion screens
- `lab2-core.js` - state management, routing, autosave, export, and optional endpoint posting
- `lab2_google_sheet_template.csv` - blank sheet template you can import into Google Sheets
- `google_sheets_web_app.gs` - Google Apps Script backend for live Google Sheet collection
- `GOOGLE_SHEETS_SETUP.md` - step-by-step live Google Sheets setup
- `app.js` - legacy prototype file that is no longer loaded by `index.html`

## Quick Start
1. Open [index.html](C:\Users\JayCh\ASU Dropbox\Jie Chen\Research\Text to video\material\misq\Lab2\experiment\index.html) in a browser.
2. For a no-media walkthrough, use preview mode:
   `index.html?preview=1&condition=C2`
3. For a live run, place the required audio and image files in the `media/` folders described below.
4. For live Google Sheets collection, also follow [GOOGLE_SHEETS_SETUP.md](C:\Users\JayCh\ASU Dropbox\Jie Chen\Research\Text to video\material\misq\Lab2\experiment\GOOGLE_SHEETS_SETUP.md).

## Media Paths
Audio files are expected at:
- `media/audio/audio1.mp3`
- `media/audio/audio2.mp3`
- `media/audio/audio3.mp3`
- `media/audio/audio4.mp3`
- `media/audio/audio5.mp3`
- `media/audio/audio6.mp3`

Condition `C2` static images are expected at:
- `media/images/c2/lecture2.jpg`
- `media/images/c2/lecture3.jpg`
- `media/images/c2/lecture4.jpg`
- `media/images/c2/lecture5.jpg`
- `media/images/c2/lecture6.jpg`

Condition `C3` chunked images are expected at:
- `media/images/c3/lecture2-chunk1.jpg`
- `media/images/c3/lecture2-chunk2.jpg`
- `media/images/c3/lecture2-chunk3.jpg`
- `media/images/c3/lecture3-chunk1.jpg`
- `media/images/c3/lecture3-chunk2.jpg`
- `media/images/c3/lecture3-chunk3.jpg`
- `media/images/c3/lecture4-chunk1.jpg`
- `media/images/c3/lecture4-chunk2.jpg`
- `media/images/c3/lecture4-chunk3.jpg`
- `media/images/c3/lecture5-chunk1.jpg`
- `media/images/c3/lecture5-chunk2.jpg`
- `media/images/c3/lecture5-chunk3.jpg`
- `media/images/c3/lecture6-chunk1.jpg`
- `media/images/c3/lecture6-chunk2.jpg`
- `media/images/c3/lecture6-chunk3.jpg`

If a file is missing, the site shows a placeholder panel. In preview mode, audio can be manually marked complete.

## Data Collection
- The site autosaves progress in browser `localStorage`.
- On the final screen, the participant can download a JSON or CSV export of the session.
- The site stores timing information, including total session length and per-lecture question-answering duration.
- The background section now spans two screens and includes an instructed-response attention check, a required 4-digit payment identifier field, and screening items for vision, desktop/laptop use, and prior participation.
- If you supply `?endpoint=https://your-endpoint`, the site will also POST the final payload there.
- If you supply `?cc=YOURCODE`, the thank-you screen shows a Prolific completion link.
- If you supply `?sheet=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`, the site will submit directly to a live Google Sheet.

## Editing C3 Transition Sentences
- Open [lab2-c3-transition-config.js](C:\Users\JayCh\ASU Dropbox\Jie Chen\Research\Text to video\material\misq\Lab2\experiment\lab2-c3-transition-config.js).
- For each lecture (`lecture2` to `lecture6`), fill in:
  - `sentence`: the spoken transition sentence you want to track
  - `time`: the exact image-switch time, if you have it
- Supported `time` formats:
  - `"1:30"` for 1 minute 30 seconds
  - `"90"` for 90 seconds
- If you leave the `time` fields blank, the site keeps the current equal-split chunk switching.
- If you only have the transition sentences, fill the `sentence` fields and leave `time` blank.
- The sentence fields are stored for your reference; the website uses the `time` fields to determine when C3 images change.
- To capture exact times manually, open [c3-transition-timing-helper.html](C:\Users\JayCh\ASU Dropbox\Jie Chen\Research\Text to video\material\misq\Lab2\experiment\c3-transition-timing-helper.html), play each lecture, and click the capture button when you hear each transition sentence.

## Notes
- The participant-facing flow follows `Full_Survey.docx` as the main source of truth.
- Condition assignment happens after the pre-test lecture.
- The audio-only condition skips the final image-specific scale and goes straight to the reflection prompt.
- In preview mode, a jump tool appears above the study so you can open later lecture/question screens without uploading media first.
