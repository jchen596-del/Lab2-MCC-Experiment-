window.LAB2 = window.LAB2 || {};

Object.assign(window.LAB2, {
  renderFinalImage() {
    const A = window.LAB2;
    const a = A.state.responses.final.imageCheck || {};
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Image Experience Questions</p><h2>Overall Visual Experience</h2><p class="lede">The following questions are about the visual content displayed during the lectures in this study. Please answer based on your overall experience across all lectures.</p></div>
        <form id="finalImageForm" class="card-stack">
          ${A.scaleBlock("imageCheck", a)}
          <div class="buttons"><button class="primary-button" type="submit">Next</button></div>
        </form>
      </section>`;
    document.getElementById("finalImageForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const out = {};
      for (let i = 0; i < A.data.scales.imageCheck.items.length; i += 1) {
        const v = fd.get(`imageCheck_${i + 1}`);
        if (!v) return window.alert("Please answer all image experience questions before continuing.");
        out[`item${i + 1}`] = Number(v);
      }
      A.state.responses.final.imageCheck = out;
      A.state.responses.final.imageCheckSubmittedAt = new Date().toISOString();
      A.state.responses.final.imageCheckDurationSec = A.diffSeconds(
        A.state.responses.final.imageCheckStartedAt,
        A.state.responses.final.imageCheckSubmittedAt
      );
      A.saveState();
      A.go("reflection");
    });
  },

  renderReflection() {
    const A = window.LAB2;
    const value = A.state.responses.final.reflection || "";
    const prompt = A.state.condition === "C1"
      ? "If you have any comments about the listening task, please share them below. This is entirely optional."
      : "If you have any comments about the visual materials shown during the lectures, please share them below. This is entirely optional.";
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Open Reflection</p><h2>Optional Comment</h2><p class="lede">${prompt}</p></div>
        <form id="reflectionForm" class="card-stack">
          <div class="field-group"><label for="reflectionText">${A.state.condition === "C1" ? "Optional comment" : "Did you notice anything about the images displayed during the lectures? Were they helpful or distracting?"}</label><textarea id="reflectionText" name="reflectionText">${A.esc(value)}</textarea></div>
          <div class="buttons"><button class="primary-button" type="submit">Next</button></div>
        </form>
      </section>`;
    document.getElementById("reflectionForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      A.state.responses.final.reflection = A.text(fd.get("reflectionText"));
      A.state.responses.final.reflectionSubmittedAt = new Date().toISOString();
      A.state.responses.final.reflectionDurationSec = A.diffSeconds(
        A.state.responses.final.reflectionStartedAt,
        A.state.responses.final.reflectionSubmittedAt
      );
      A.saveState();
      A.go("debrief");
    });
  },

  renderDebrief() {
    const A = window.LAB2;
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Debriefing</p><h2>Thank You for Participating</h2><p class="lede">Thank you very much for participating in this study.</p></div>
        <div class="card-stack">
          <div class="summary-panel"><strong>What this study was really about</strong><p class="fine-print">This study investigated how AI-generated images displayed alongside spoken academic lectures affect listening comprehension in English as a second or foreign language. Specifically, it examines whether images that are misaligned with the audio content can disrupt comprehension, a phenomenon called Multimodal Cognitive Conflict (MCC).</p></div>
          <div class="summary-panel"><strong>Why this was not disclosed at the start</strong><p class="fine-print">If participants had known in advance that the study was about the effects of images on comprehension, they might have paid different attention to the images. The initial description as a general comprehension task was therefore used to obtain less biased data.</p></div>
          <div class="summary-panel"><strong>Your data</strong><p class="fine-print">Your responses should be kept confidential and used only for research purposes. If you feel uncomfortable about any aspect of the study, you may withdraw your data by contacting the research team within two weeks of participation.</p></div>
          <div class="notice"><strong>Contact:</strong> ${A.config.pi} | ${A.config.email}</div>
        </div>
        <div class="buttons"><button id="finishExperiment" class="primary-button" type="button">Submit and Finish</button></div>
      </section>`;
    document.getElementById("finishExperiment").addEventListener("click", async () => {
      A.state.completedAt = new Date().toISOString();
      A.state.device = A.deviceInfo();
      A.saveState();
      await A.submitIfNeeded();
      A.go("complete");
    });
  },

  renderComplete() {
    const A = window.LAB2;
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Thank You</p><h2>Your Responses Have Been Recorded</h2><p class="lede">Thank you for your participation in this study. Your responses have been successfully recorded.</p></div>
      </section>`;
  },
});
