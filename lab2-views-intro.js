window.LAB2 = window.LAB2 || {};

const AGE_OPTIONS = [["", "Select one"]]
  .concat(Array.from({ length: 53 }, (_, index) => {
    const age = 18 + index;
    return [String(age), String(age)];
  }))
  .concat([["71_plus", "71 or older"]]);

const COUNTRY_OPTIONS = [
  ["", "Select one"],
  ["China", "China"],
  ["India", "India"],
  ["Indonesia", "Indonesia"],
  ["Japan", "Japan"],
  ["South Korea", "South Korea"],
  ["Vietnam", "Vietnam"],
  ["Thailand", "Thailand"],
  ["Malaysia", "Malaysia"],
  ["Singapore", "Singapore"],
  ["Philippines", "Philippines"],
  ["Pakistan", "Pakistan"],
  ["Bangladesh", "Bangladesh"],
  ["Nepal", "Nepal"],
  ["Sri Lanka", "Sri Lanka"],
  ["United Arab Emirates", "United Arab Emirates"],
  ["Saudi Arabia", "Saudi Arabia"],
  ["Turkey", "Turkey"],
  ["Iran", "Iran"],
  ["Egypt", "Egypt"],
  ["Morocco", "Morocco"],
  ["Nigeria", "Nigeria"],
  ["Kenya", "Kenya"],
  ["South Africa", "South Africa"],
  ["United States", "United States"],
  ["Canada", "Canada"],
  ["Mexico", "Mexico"],
  ["Brazil", "Brazil"],
  ["Argentina", "Argentina"],
  ["Chile", "Chile"],
  ["Colombia", "Colombia"],
  ["Peru", "Peru"],
  ["United Kingdom", "United Kingdom"],
  ["Ireland", "Ireland"],
  ["Germany", "Germany"],
  ["France", "France"],
  ["Italy", "Italy"],
  ["Spain", "Spain"],
  ["Portugal", "Portugal"],
  ["Netherlands", "Netherlands"],
  ["Belgium", "Belgium"],
  ["Switzerland", "Switzerland"],
  ["Austria", "Austria"],
  ["Poland", "Poland"],
  ["Sweden", "Sweden"],
  ["Norway", "Norway"],
  ["Finland", "Finland"],
  ["Denmark", "Denmark"],
  ["Australia", "Australia"],
  ["New Zealand", "New Zealand"],
  ["Russia", "Russia"],
  ["Ukraine", "Ukraine"],
  ["Other", "Other"],
];

const LANGUAGE_OPTIONS = [
  ["", "Select one"],
  ["Mandarin Chinese", "Mandarin Chinese"],
  ["Cantonese Chinese", "Cantonese Chinese"],
  ["English", "English"],
  ["Spanish", "Spanish"],
  ["Hindi", "Hindi"],
  ["Arabic", "Arabic"],
  ["Bengali", "Bengali"],
  ["Portuguese", "Portuguese"],
  ["Russian", "Russian"],
  ["Japanese", "Japanese"],
  ["Korean", "Korean"],
  ["French", "French"],
  ["German", "German"],
  ["Turkish", "Turkish"],
  ["Vietnamese", "Vietnamese"],
  ["Thai", "Thai"],
  ["Indonesian", "Indonesian"],
  ["Malay", "Malay"],
  ["Urdu", "Urdu"],
  ["Tamil", "Tamil"],
  ["Telugu", "Telugu"],
  ["Persian", "Persian"],
  ["Italian", "Italian"],
  ["Polish", "Polish"],
  ["Dutch", "Dutch"],
  ["Filipino / Tagalog", "Filipino / Tagalog"],
  ["Ukrainian", "Ukrainian"],
  ["Other", "Other"],
];

const TEST_OPTIONS = [
  ["toefl", "TOEFL"],
  ["ielts", "IELTS"],
  ["cet4", "CET-4"],
  ["cet6", "CET-6"],
  ["other", "Other (please specify)"],
];

Object.assign(window.LAB2, {
  renderWelcome() {
    const A = window.LAB2;
    A.root.innerHTML = `
      <section class="card card-stack">
        <div class="document-sheet">
          <p class="section-eyebrow">Welcome to the Study</p>
          <h2>${A.config.title}</h2>
          <p class="lede">This session includes audio materials, multiple-choice questions, and short follow-up questions. The full session will take approximately ${A.config.duration}. Participation is voluntary, and you may stop at any time before submitting.</p>
          <div class="document-section">
            <h3>What to expect</h3>
            <p>You will move through the study one screen at a time. Some screens ask for background information, and later screens ask you to listen carefully and respond to questions about the material.</p>
          </div>
          <div class="document-section">
            <h3>Before you begin</h3>
            <p>Please complete the study on a desktop or laptop if possible, and use headphones or speakers in a quiet setting.</p>
          </div>
        </div>
        ${A.config.preview ? `<div class="notice"><strong>Preview mode:</strong> Use <code>?condition=C1</code>, <code>C2</code>, or <code>C3</code> to test a specific branch.</div>` : ""}
        ${window.innerWidth < 960 ? `<div class="warning-card"><strong>Device note:</strong> This experiment is intended for desktop or laptop use so audio and images display clearly.</div>` : ""}
        <div class="buttons"><button id="startWelcome" class="primary-button" type="button">Continue to Consent Form</button></div>
      </section>`;
    document.getElementById("startWelcome").addEventListener("click", () => A.go("consent"));
  },

  renderConsent() {
    const A = window.LAB2;
    const choice = A.state.consent.choice || "";
    A.root.innerHTML = `
      <section class="card card-stack">
        <div class="document-sheet">
          <p class="section-eyebrow">Informed Consent</p>
          <h2>${A.config.title}</h2>
          <p class="lede">Please read the study information below carefully before deciding whether to participate.</p>
          <div class="document-section">
            <p><strong>Institution:</strong> ${A.config.institution}</p>
            <p><strong>Principal Investigator:</strong> ${A.config.pi}</p>
            <p><strong>Email:</strong> ${A.config.email}</p>
            <p><strong>IRB Status:</strong> ${A.config.irb}</p>
          </div>
          <div class="document-section">
            <h3>Purpose of the Study</h3>
            <p>This study examines how people understand short lecture materials presented online. You will listen to audio recordings and answer questions about what you heard.</p>
          </div>
          <div class="document-section">
            <h3>What You Will Do</h3>
            <p>If you agree to participate, you will complete a short background questionnaire, work through six lecture tasks, and answer follow-up questions about your experience.</p>
          </div>
          <div class="document-section">
            <h3>Time and Compensation</h3>
            <p>The session takes about ${A.config.duration}. Participants who complete the task carefully and accurately may receive a substantial additional bonus.</p>
          </div>
          <div class="document-section">
            <h3>Voluntary Participation</h3>
            <p>Your participation is voluntary. You may stop at any time by closing the browser window. Incomplete sessions are normally not compensated.</p>
          </div>
          <div class="document-section">
            <h3>Confidentiality</h3>
            <p>Your responses will be used for research purposes. Please contact the research team if you have any questions about the study or your participation.</p>
          </div>
        </div>
        <form id="consentForm" class="card-stack">
          <div class="choice-list">
            <label class="choice-card"><input type="radio" name="consent" value="yes"${A.checked(choice, "yes")} /><span>I have read and understood the information above, and I voluntarily agree to participate in this study.</span></label>
            <label class="choice-card"><input type="radio" name="consent" value="no"${A.checked(choice, "no")} /><span>I do not agree to participate.</span></label>
          </div>
          <div class="buttons">
            <button class="primary-button" type="submit">Confirm</button>
            <button id="backConsent" class="secondary-button" type="button">Back</button>
          </div>
        </form>
      </section>`;
    document.getElementById("backConsent").addEventListener("click", () => A.go("welcome"));
    document.getElementById("consentForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const consent = fd.get("consent");
      if (!consent) return window.alert("Please indicate whether you agree to participate.");
      A.state.consent = { choice: consent, recordedAt: new Date().toISOString() };
      A.saveState();
      if (consent === "no") return A.go("exit", { exitReason: "declined-consent" });
      A.go("eligibility");
    });
  },

  renderEligibility() {
    const A = window.LAB2;
    const d = A.state.eligibility;
    const deviceOptions = [
      ["", "Select one"],
      ["laptop", "Laptop"],
      ["desktop", "Desktop computer"],
      ["tablet", "Tablet (e.g., iPad)"],
      ["phone", "Phone"],
      ["other", "Other"],
    ];
    A.root.innerHTML = `
      <section class="card card-stack">
        <div>
          <p class="section-eyebrow">Eligibility Check</p>
          <h2>Before We Begin</h2>
          <p class="lede">Please confirm that you meet the study eligibility criteria by answering the following questions.</p>
        </div>
        ${window.innerWidth < 960 ? `<div class="warning-card"><strong>Device note:</strong> Your current browser window is narrow. This study is designed for desktop or laptop use so images are displayed at an adequate size.</div>` : ""}
        <form id="eligibilityForm" class="card-stack">
          ${A.yesNo("age", "Are you 18 years of age or older?", d.age || "")}
          ${A.yesNo("english", "Is English a language you learned as a second or foreign language (not as your first language from birth)?", d.english || "")}
          ${A.yesNo("device", "Do you have access to a device with speakers or headphones and a stable internet connection for the duration of this study?", d.device || "")}
          ${A.yesNo("redGreenColorBlindness", "Do you have red-green color blindness?", d.redGreenColorBlindness || "")}
          ${A.selectField("deviceType", "What type of device are you currently using to complete this study?", d.deviceType || "", deviceOptions)}
          ${A.yesNo("priorParticipation", "Have you participated in this study or a related version of this study before?", d.priorParticipation || "")}
          <div class="buttons">
            <button class="primary-button" type="submit">Next</button>
            <button id="backEligibility" class="secondary-button" type="button">Back</button>
          </div>
        </form>
      </section>`;
    document.getElementById("backEligibility").addEventListener("click", () => A.go("consent"));
    document.getElementById("eligibilityForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const payload = {
        age: fd.get("age"),
        english: fd.get("english"),
        device: fd.get("device"),
        redGreenColorBlindness: fd.get("redGreenColorBlindness"),
        deviceType: A.text(fd.get("deviceType")),
        priorParticipation: fd.get("priorParticipation"),
        recordedAt: new Date().toISOString(),
      };
      if (!payload.age || !payload.english || !payload.device || !payload.redGreenColorBlindness || !payload.deviceType || !payload.priorParticipation) {
        return window.alert("Please answer all eligibility questions.");
      }
      A.state.eligibility = payload;
      A.saveState();
      const allowedDeviceTypes = ["tablet", "desktop", "laptop"];
      if (
        [payload.age, payload.english, payload.device].includes("no") ||
        payload.redGreenColorBlindness === "yes" ||
        !allowedDeviceTypes.includes(payload.deviceType) ||
        payload.priorParticipation === "yes"
      ) {
        return A.go("exit", { exitReason: "failed-eligibility" });
      }
      A.go("demographics");
    });
  },

  renderExit() {
    const A = window.LAB2;
    const declined = A.state.exitReason === "declined-consent";
    const failedAttentionCheck = A.state.exitReason === "failed-attention-check";
    const failedScreening = A.state.exitReason === "failed-screening";
    const failedEligibility = A.state.exitReason === "failed-eligibility";
    const allowRestart = declined;
    A.root.innerHTML = `
      <section class="card card-stack">
        <div>
          <p class="section-eyebrow">Exit</p>
          <h2>${declined ? "You Chose Not to Participate" : "You Do Not Qualify for This Study"}</h2>
          <p class="lede">${declined ? "You chose not to participate in this study." : (failedAttentionCheck || failedScreening) ? "Based on your responses, you do not qualify to continue this study." : failedEligibility ? "Based on your responses, you do not meet the eligibility criteria for this study." : "You may not continue with this study."} You may now close this page${A.config.exitUrl ? " or use the redirect button below." : "."}</p>
        </div>
        <div class="buttons">
          ${A.config.exitUrl ? `<a class="primary-button" href="${A.esc(A.config.exitUrl)}">Leave Study</a>` : ""}
          ${allowRestart ? `<button id="restartExit" class="secondary-button" type="button">Start Over</button>` : ""}
        </div>
      </section>`;
    if (allowRestart) {
      document.getElementById("restartExit").addEventListener("click", () => {
        A.clearState();
        A.state = A.freshState();
        A.render();
      });
    }
  },

  renderDemographics() {
    const A = window.LAB2;
    const d = A.state.participant.demographics || {};
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Demographic Information (1 of 2)</p><h2>Background Questionnaire</h2><p class="lede">Please provide the following background information. All responses are confidential.</p></div>
        <form id="demographicsForm" class="card-stack">
          ${A.selectField("age", "What is your age?", d.age || "", AGE_OPTIONS)}
          ${A.selectField("gender", "What is your gender?", d.gender || "", [["", "Select one"], ["male", "Male"], ["female", "Female"], ["nonbinary", "Non-binary / gender diverse"], ["prefer_not_to_say", "Prefer not to say"]])}
          ${A.selectField("country", "What is your country or region of birth?", d.country || "", COUNTRY_OPTIONS)}
          ${A.selectField("nativeLanguage", "What is your native language?", d.nativeLanguage || "", LANGUAGE_OPTIONS)}
          ${A.selectField("education", "What is your highest completed level of education?", d.education || "", [["", "Select one"], ["high_school", "Secondary school / high school"], ["some_college", "Some college / university (not completed)"], ["bachelor", "Bachelor's degree"], ["master", "Master's degree"], ["doctoral", "Doctoral or professional degree"]])}
          <div class="buttons">
            <button class="primary-button" type="submit">Next</button>
            <button id="backDemographics" class="secondary-button" type="button">Back</button>
          </div>
        </form>
      </section>`;
    document.getElementById("backDemographics").addEventListener("click", () => A.go("eligibility"));
    document.getElementById("demographicsForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const payload = {
        age: A.text(fd.get("age")),
        gender: A.text(fd.get("gender")),
        country: A.text(fd.get("country")),
        nativeLanguage: A.text(fd.get("nativeLanguage")),
        education: A.text(fd.get("education")),
      };
      if (!payload.age || !payload.gender || !payload.country || !payload.nativeLanguage || !payload.education) return window.alert("Please complete all required demographic questions.");
      A.state.participant.demographics = payload;
      A.saveState();
      A.go("screening");
    });
  },

  renderScreening() {
    const A = window.LAB2;
    const d = A.state.participant.screening || {};
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Demographic Information (2 of 2)</p><h2>Verification and Payment Identifier</h2><p class="lede">Please complete the final verification items before continuing.</p></div>
        <form id="screeningForm" class="card-stack">
          ${A.selectField("attentionCheck", "To confirm you are reading instructions carefully, please select \"Red\" for this question.", d.attentionCheck || "", [["", "Select one"], ["blue", "Blue"], ["green", "Green"], ["red", "Red"], ["yellow", "Yellow"]])}
          <div class="field-group">
            <label for="paymentIdentifierLast4">Please enter the last 4 digits of your phone number. This will be used as your final identifier for payment and bonus processing.</label>
            <input id="paymentIdentifierLast4" name="paymentIdentifierLast4" type="text" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" value="${A.esc(d.paymentIdentifierLast4 || "")}" placeholder="Last 4 digits" />
          </div>
          <div class="buttons">
            <button class="primary-button" type="submit">Next</button>
            <button id="backScreening" class="secondary-button" type="button">Back</button>
          </div>
        </form>
      </section>`;
    document.getElementById("backScreening").addEventListener("click", () => A.go("demographics"));
    document.getElementById("screeningForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const payload = {
        attentionCheck: A.text(fd.get("attentionCheck")),
        attentionCheckPassed: A.text(fd.get("attentionCheck")) === "red",
        paymentIdentifierLast4: A.text(fd.get("paymentIdentifierLast4")),
      };
      if (!payload.attentionCheck || !payload.paymentIdentifierLast4) return window.alert("Please complete all required screening questions.");
      if (!/^\d{4}$/.test(payload.paymentIdentifierLast4)) return window.alert("Please enter exactly the last 4 digits of your phone number.");
      A.state.participant.screening = payload;
      A.saveState();
      if (!payload.attentionCheckPassed) {
        return A.go("exit", { exitReason: !payload.attentionCheckPassed ? "failed-attention-check" : "failed-screening" });
      }
      A.go("language");
    });
  },

  renderLanguage() {
    const A = window.LAB2;
    const d = A.state.participant.language || {};
    const contexts = Array.isArray(d.contexts) ? d.contexts : [];
    const selectedTestType = d.testType || (d.testDetails ? "other" : "");
    const selectedTestScore = d.testScore || "";
    const selectedOtherTestName = d.otherTestName || (selectedTestType === "other" ? (d.testName || d.testDetails || "") : "");
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">English Language Background</p><h2>Learning and Usage</h2><p class="lede">The following questions are about your experience learning and using English.</p></div>
        <form id="languageForm" class="card-stack">
          <div class="card-stack">
            ${A.selectField("yearsEnglish", "How many years have you been studying English?", d.yearsEnglish || "", [["", "Select one"], ["less_than_1", "Less than 1 year"], ["1_3", "1-3 years"], ["4_6", "4-6 years"], ["7_10", "7-10 years"], ["more_than_10", "More than 10 years"]])}
            ${A.selectField("useFrequency", "How often do you currently use English in your daily life?", d.useFrequency || "", [["", "Select one"], ["daily", "Every day"], ["several_times_per_week", "Several times per week"], ["once_per_week", "About once per week"], ["occasionally", "Occasionally (less than once per week)"]])}
            ${A.selectField("selfProficiency", "What is your self-assessed English proficiency level?", d.selfProficiency || "", [["", "Select one"], ["A1", "A1 - Beginner"], ["A2", "A2 - Elementary"], ["B1", "B1 - Intermediate"], ["B2", "B2 - Upper-Intermediate"], ["C1", "C1 - Advanced"]])}
            ${A.selectField("testExperience", "Have you taken a standardised English proficiency test?", d.testExperience || "", [["", "Select one"], ["yes", "Yes"], ["no", "No"]])}
          </div>
          <fieldset id="testDetailsSection" class="question-card conditional-question${d.testExperience === "yes" ? "" : " hidden"}">
            <legend>If yes, please select the test and enter your most recent score.</legend>
            <div class="test-score-grid">
              ${TEST_OPTIONS.map(([value, label]) => {
                const checked = A.checked(selectedTestType, value);
                if (value === "other") {
                  return `
                    <label class="test-score-row test-score-row-other">
                      <span class="test-score-option">
                        <input type="radio" name="testType" value="${value}"${checked} />
                        <span>${label}</span>
                      </span>
                      <input class="compact-input" id="otherTestName" name="otherTestName" type="text" value="${A.esc(selectedOtherTestName)}" placeholder="Please specify" />
                      <span class="inline-label">Score</span>
                      <input class="compact-input compact-score" data-score-for="${value}" id="score_${value}" name="score_${value}" type="text" inputmode="decimal" value="${A.esc(selectedTestType === value ? selectedTestScore : "")}" placeholder="Most recent score" />
                    </label>`;
                }
                return `
                  <label class="test-score-row">
                    <span class="test-score-option">
                      <input type="radio" name="testType" value="${value}"${checked} />
                      <span>${label}</span>
                    </span>
                    <span class="test-score-inputs">
                      <span class="inline-label">Score</span>
                      <input class="compact-input compact-score" data-score-for="${value}" id="score_${value}" name="score_${value}" type="text" inputmode="decimal" value="${A.esc(selectedTestType === value ? selectedTestScore : "")}" placeholder="Most recent score" />
                    </span>
                  </label>`;
              }).join("")}
            </div>
          </fieldset>
          <fieldset class="question-card">
            <legend>In what contexts have you primarily learned English? (Select all that apply)</legend>
            <div class="checkbox-list">
              ${A.checkbox("contexts", "classroom", "Formal classroom instruction", contexts)}
              ${A.checkbox("contexts", "self_study", "Self-study (books, apps, online resources)", contexts)}
              ${A.checkbox("contexts", "english_environment", "Living or working in an English-speaking environment", contexts)}
              ${A.checkbox("contexts", "informal_exposure", "Informal exposure (films, TV, music, internet)", contexts)}
              ${A.checkbox("contexts", "other", "Other", contexts)}
            </div>
          </fieldset>
          <div class="buttons">
            <button class="primary-button" type="submit">Next</button>
            <button id="backLanguage" class="secondary-button" type="button">Back</button>
          </div>
        </form>
      </section>`;
    const languageForm = document.getElementById("languageForm");
    const testExperience = document.getElementById("testExperience");
    const testDetailsSection = document.getElementById("testDetailsSection");
    const testTypeRadios = Array.from(languageForm.querySelectorAll('input[name="testType"]'));
    const testScoreInputs = Array.from(languageForm.querySelectorAll("[data-score-for]"));
    const otherTestNameInput = document.getElementById("otherTestName");

    const syncTestDetails = () => {
      const showDetails = testExperience.value === "yes";
      testDetailsSection.classList.toggle("hidden", !showDetails);
      const selected = languageForm.querySelector('input[name="testType"]:checked')?.value || "";

      testTypeRadios.forEach((radio) => {
        radio.disabled = !showDetails;
      });

      testScoreInputs.forEach((input) => {
        input.disabled = !showDetails || input.dataset.scoreFor !== selected;
      });

      if (otherTestNameInput) {
        otherTestNameInput.disabled = !showDetails || selected !== "other";
      }
    };

    testExperience.addEventListener("change", syncTestDetails);
    testTypeRadios.forEach((radio) => radio.addEventListener("change", syncTestDetails));
    syncTestDetails();

    document.getElementById("backLanguage").addEventListener("click", () => A.go("screening"));
    languageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const testExperienceValue = A.text(fd.get("testExperience"));
      const testTypeValue = testExperienceValue === "yes" ? A.text(fd.get("testType")) : "";
      const testLabelMap = Object.fromEntries(TEST_OPTIONS);
      let testName = "";
      let testScore = "";
      let otherTestName = "";

      if (testExperienceValue === "yes") {
        if (!testTypeValue) return window.alert("Please select the English proficiency test you have taken.");
        if (testTypeValue === "other") {
          otherTestName = A.text(fd.get("otherTestName"));
          testScore = A.text(fd.get("score_other"));
          if (!otherTestName || !testScore) return window.alert("Please specify the other test name and enter the most recent score.");
          testName = otherTestName;
        } else {
          testName = testLabelMap[testTypeValue] || testTypeValue.toUpperCase();
          testScore = A.text(fd.get(`score_${testTypeValue}`));
          if (!testScore) return window.alert("Please enter the most recent score for the selected English proficiency test.");
        }
      }

      const payload = {
        yearsEnglish: A.text(fd.get("yearsEnglish")),
        useFrequency: A.text(fd.get("useFrequency")),
        selfProficiency: A.text(fd.get("selfProficiency")),
        testExperience: testExperienceValue,
        testType: testTypeValue,
        testName,
        testScore,
        otherTestName,
        testDetails: testExperienceValue === "yes" && testName && testScore ? `${testName}: ${testScore}` : "",
        contexts: fd.getAll("contexts"),
      };
      if (!payload.yearsEnglish || !payload.useFrequency || !payload.selfProficiency || !payload.testExperience) return window.alert("Please complete all required English background questions.");
      A.state.participant.language = payload;
      A.saveState();
      A.go("instructions");
    });
  },

  renderInstructions() {
    const A = window.LAB2;
    const i = A.state.participant.instructions || {};
    A.root.innerHTML = `
      <section class="card card-stack">
        <div class="document-sheet">
          <p class="section-eyebrow">Study Instructions</p>
          <h2>Please Read Carefully</h2>
          <p class="lede">You will not be able to return to this page once the study begins.</p>
          <div class="document-section">
            <h3>Task Flow</h3>
            <p>You will listen to six short lecture passages. After each lecture, you will answer four comprehension questions. At selected points, you will also answer short questions about your experience during the task.</p>
          </div>
          <div class="document-section">
            <h3>Audio and Display</h3>
            <p>Please listen to each lecture from start to finish. The next button will become available only after the audio is completed. Some lecture screens may include a visual display.</p>
          </div>
          <div class="document-section">
            <h3>Important Guidelines</h3>
            <ul class="checklist">
              <li>Use headphones or earphones if available.</li>
              <li>You may take notes while listening if that helps you follow the lecture.</li>
              <li>Please complete the study in one session without interruptions.</li>
              <li>Answer based on the lecture content rather than prior knowledge.</li>
              <li>There are no right or wrong answers to the opinion questions, but the comprehension questions do have correct answers.</li>
            </ul>
          </div>
        </div>
        <div class="summary-panel"><strong>Audio check</strong><p class="fine-print">Before the study begins, please ensure your device volume is at a comfortable level. You may also prepare to take notes during the lecture tasks.</p><div class="buttons"><button id="audioCheckButton" class="secondary-button" type="button">Play Audio Check Tone</button></div></div>
        <form id="instructionsForm" class="card-stack">
          <label class="choice-card"><input type="checkbox" name="ready"${i.ready ? " checked" : ""} /><span>I can hear the audio clearly and I am ready to begin.</span></label>
          <div class="buttons"><button class="primary-button" type="submit">Begin Study</button></div>
        </form>
      </section>`;
    document.getElementById("audioCheckButton").addEventListener("click", async () => {
      await A.playTone();
      A.state.participant.instructions.audioChecked = true;
      A.saveState();
    });
    document.getElementById("instructionsForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const ready = e.currentTarget.querySelector('input[name="ready"]').checked;
      if (!ready) return window.alert("Please confirm that you can hear the audio clearly and are ready to begin.");
      A.state.participant.instructions.ready = true;
      A.saveState();
      A.go("lecture-intro");
    });
  },
});
