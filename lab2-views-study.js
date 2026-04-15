window.LAB2 = window.LAB2 || {};

Object.assign(window.LAB2, {
  renderLectureIntro() {
    const A = window.LAB2;
    const l = A.lecture();
    const introTitle = l.n === 1 ? "Practice Lecture" : `Lecture ${l.n} of ${A.data.lectures.length}`;
    const introText = l.n === 1
      ? "You are about to hear a practice lecture. Please listen carefully to the full audio. After it ends, you will answer four comprehension questions."
      : "You are about to hear the next lecture. Please listen carefully to the full audio. After it ends, you will answer four comprehension questions.";
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">${l.n === 1 ? "Phase 4" : "Phase 5"}</p><h2>${A.esc(introTitle)}</h2><p class="lede">${A.esc(introText)}</p></div>
        <div class="notice"><strong>Reminder:</strong> You may take notes while listening, and answer the questions after the audio ends.</div>
        <div class="summary-panel"><strong>Before you continue</strong><p class="fine-print">${l.n === 1 ? "The first lecture is presented with audio only." : "Questions will open after the audio has finished."}</p></div>
        <div class="buttons"><button id="startLecture" class="primary-button" type="button">${l.n === 1 ? "Start Lecture 1" : "Start Lecture"}</button></div>
      </section>`;
    document.getElementById("startLecture").addEventListener("click", () => A.go("lecture-listen"));
  },

  renderListen() {
    const A = window.LAB2;
    const l = A.lecture();
    const r = A.lectureRecord(l.id);
    A.root.innerHTML = `
      <section id="listenTask" class="card card-stack listen-task-shell">
        <div class="listen-stage-panel">
          <div id="visualStage"></div>
        </div>
        <div class="listen-status-bar">
          <div class="listen-status-left">
            <span id="audioStatus" class="status-pill${r.audioFinished ? " complete" : ""}">${r.audioFinished ? "Audio complete" : "Preparing audio"}</span>
            <span id="audioCountdown" class="countdown-pill"${r.audioFinished ? " hidden" : ""}>Audio starts in 2 seconds</span>
            <button id="resumeAudioButton" class="secondary-button hidden" type="button">Start Audio</button>
            <button id="previewCompleteButton" class="secondary-button${A.config.preview ? "" : " hidden"}" type="button">Skip Audio (Preview)</button>
          </div>
          <span id="audioClock" class="audio-clock">00:00 / --:--</span>
        </div>
        <div class="audio-panel audio-panel-compact">
          <audio id="lectureAudio" preload="metadata" src="${A.esc(l.audio)}"></audio>
          <p id="audioHelp" class="listen-help">The audio starts automatically. If it does not start, choose Start Audio.</p>
        </div>
        <div class="listen-actions"><button id="continueAudio" class="primary-button" type="button"${r.audioFinished ? "" : " disabled"}>Continue to Questions</button></div>
      </section>`;

    const audio = document.getElementById("lectureAudio");
    const resume = document.getElementById("resumeAudioButton");
    const done = document.getElementById("previewCompleteButton");
    const cont = document.getElementById("continueAudio");
    const status = document.getElementById("audioStatus");
    const countdown = document.getElementById("audioCountdown");
    const clock = document.getElementById("audioClock");
    const help = document.getElementById("audioHelp");
    const visual = document.getElementById("visualStage");
    const task = document.getElementById("listenTask");
    let chunk = 0;
    let countdownTimer = null;
    A.visualStage(visual, l, chunk);
    const alignListenView = () => {
      if (!task) return;
      const top = Math.max(0, task.getBoundingClientRect().top + window.scrollY - 8);
      window.scrollTo({ top, left: 0, behavior: "auto" });
    };
    window.requestAnimationFrame(() => window.requestAnimationFrame(alignListenView));

    const clearCountdown = () => {
      if (countdownTimer) {
        window.clearInterval(countdownTimer);
        countdownTimer = null;
      }
    };

    const markDone = (source) => {
      clearCountdown();
      r.audioFinished = true;
      r.audioCompletionSource = source;
      r.audioCompletedAt = new Date().toISOString();
      r.audioDurationSec = A.diffSeconds(r.audioStartedAt, r.audioCompletedAt);
      status.textContent = "Audio complete";
      status.classList.add("complete");
      if (countdown) countdown.classList.add("hidden");
      resume.classList.add("hidden");
      cont.disabled = false;
      A.saveState();
    };

    const updateClock = () => {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
      clock.textContent = `${A.fmt(audio.currentTime || 0)} / ${dur ? A.fmt(dur) : "--:--"}`;
      if (A.state.condition === "C3" && l.chunks.length) {
        const configuredTimes = Array.isArray(l.c3TransitionTimes) ? l.c3TransitionTimes : [];
        const hasExactTransitions =
          configuredTimes.length === Math.max(0, l.chunks.length - 1) &&
          configuredTimes.every((value) => Number.isFinite(value));
        const next = hasExactTransitions
          ? configuredTimes.reduce((index, time) => index + (audio.currentTime >= time ? 1 : 0), 0)
          : (dur ? Math.min(Math.floor((audio.currentTime / dur) * l.chunks.length), l.chunks.length - 1) : 0);
        if (next !== chunk) {
          chunk = next;
          A.visualStage(visual, l, chunk);
        }
      }
    };

    const startPlayback = async (source = "auto") => {
      clearCountdown();
      r.audioStartedAt = r.audioStartedAt || new Date().toISOString();
      A.saveState();
      try {
        await audio.play();
        if (countdown) countdown.classList.add("hidden");
        resume.classList.add("hidden");
        status.textContent = "Playing audio";
        updateClock();
      } catch {
        if (source === "auto") {
          status.textContent = "Audio ready";
          help.textContent = "Automatic playback was blocked by the browser. Choose Start Audio to continue.";
          resume.classList.remove("hidden");
          return;
        }
        help.textContent = "The audio file could not be played. Check that the file exists and is accessible from this browser.";
        if (!A.config.preview) window.alert("The audio file could not be played. Please add the required media file before launching this study.");
      }
    };

    const beginCountdown = () => {
      if (r.audioFinished || r.audioStartedAt) {
        if (countdown) countdown.classList.add("hidden");
        return;
      }
      let secondsLeft = 2;
      countdown.textContent = `Audio starts in ${secondsLeft} seconds`;
      countdownTimer = window.setInterval(() => {
        secondsLeft -= 1;
        if (secondsLeft > 0) {
          countdown.textContent = `Audio starts in ${secondsLeft} second${secondsLeft === 1 ? "" : "s"}`;
          return;
        }
        countdown.textContent = "Starting audio...";
        clearCountdown();
        window.setTimeout(() => {
          startPlayback("auto");
        }, 250);
      }, 1000);
    };

    resume.addEventListener("click", () => startPlayback("manual"));
    done.addEventListener("click", () => {
      r.audioStartedAt = r.audioStartedAt || new Date().toISOString();
      markDone("preview");
    });
    cont.addEventListener("click", () => A.go("comprehension"));
    audio.addEventListener("loadedmetadata", updateClock);
    audio.addEventListener("timeupdate", updateClock);
    audio.addEventListener("ended", () => {
      updateClock();
      markDone("ended");
    });
    audio.addEventListener("error", () => {
      clearCountdown();
      if (countdown) countdown.classList.add("hidden");
      help.textContent = "The configured audio file was not found. Add the required media file or use preview mode for testing.";
    });

    if (!r.audioFinished) beginCountdown();
  },

  visualStage(node, l, chunk) {
    const A = window.LAB2;
    if (l.n === 1 || !A.state.condition || A.state.condition === "C1") {
      node.innerHTML = `<div class="audio-only-banner"><strong>Audio-only lecture</strong></div>`;
      return;
    }
    if (A.state.condition === "C2") {
      node.innerHTML = `<div class="image-frame" id="imageFrame"><img id="conditionImage" alt="Lecture image" src="${A.esc(l.c2)}" /><div class="placeholder-art" id="imageFallback"><div><strong>Image unavailable</strong><span>Please check the image file.</span></div></div></div>`;
    } else {
      const src = l.c3[chunk] || l.c3[0];
      node.innerHTML = `<div class="image-frame" id="imageFrame"><img id="conditionImage" alt="Lecture image" src="${A.esc(src)}" /><div class="placeholder-art" id="imageFallback"><div><strong>Image unavailable</strong><span>Please check the image file.</span></div></div></div>`;
    }
    const img = node.querySelector("#conditionImage");
    const frame = node.querySelector("#imageFrame");
    const fallback = node.querySelector("#imageFallback");
    img.addEventListener("load", () => {
      frame.classList.add("loaded");
      fallback.classList.add("hidden");
      window.requestAnimationFrame(alignListenView);
    });
    img.addEventListener("error", () => fallback.classList.remove("hidden"));
  },

  renderComprehension() {
    const A = window.LAB2;
    const l = A.lecture();
    const r = A.lectureRecord(l.id);
    const a = r.answers || {};
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Comprehension Questions</p><h2>${l.n === 1 ? "Practice Questions" : `Lecture ${l.n} Questions`}</h2><p class="lede">Please answer the following questions based on what you heard in the lecture. Select one answer per question.</p></div>
        <form id="compForm" class="card-stack">
          ${l.qs.map((q, i) => `<fieldset class="question-card question-card-emphasis"><legend class="question-stem">Question ${i + 1}</legend><p class="question-prompt">${A.esc(q.p)}</p><div class="choice-list">${q.o.map((o, j) => `<label class="choice-card"><input type="radio" name="${A.esc(q.id)}" value="${j}"${A.checked(String(a[q.id] ?? ""), String(j))} /><span>${String.fromCharCode(65 + j)}. ${A.esc(o)}</span></label>`).join("")}</div></fieldset>`).join("")}
          <div class="buttons"><button class="primary-button" type="submit">Submit Answers</button></div>
        </form>
      </section>`;
    document.getElementById("compForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const answers = {};
      for (const q of l.qs) {
        const v = fd.get(q.id);
        if (v === null) return window.alert("Please answer every comprehension question before submitting.");
        answers[q.id] = Number(v);
      }
      r.answers = answers;
      r.submittedAt = new Date().toISOString();
      r.questionSubmittedAt = r.submittedAt;
      r.questionDurationSec = A.diffSeconds(r.questionStartedAt, r.questionSubmittedAt);
      r.correctCount = l.qs.reduce((sum, q) => sum + (answers[q.id] === q.a ? 1 : 0), 0);
      if (l.n === 1 && !A.state.condition) A.assignCondition();
      A.saveState();
      if (A.data.postSurveyAfter.includes(A.state.lectureIndex)) return A.go("post", { postPage: 0 });
      A.go("break");
    });
  },

  assignCondition() {
    const A = window.LAB2;
    const draw = typeof crypto !== "undefined" && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296
      : Math.random();
    A.state.condition = A.config.forcedCondition || A.conditions[Math.floor(draw * A.conditions.length)];
    const level = A.state.participant.language.selfProficiency || "";
    A.state.band = ["B1", "B2"].includes(level) ? "B1-B2" : ["C1"].includes(level) ? "C1" : "A1-A2-or-unspecified";
    A.state.conditionAssignedAt = new Date().toISOString();
    A.saveState();
  },

  renderPost() {
    const A = window.LAB2;
    const l = A.lecture();
    const record = A.postRecord(l.id);
    const pages = [
      { title: "Post-Lecture Questions (1 of 3)", intro: "The following statements are about your experience during the lecture you just heard. There are no right or wrong answers.", blocks: ["acl", "wmo"] },
      { title: "Post-Lecture Questions (2 of 3)", intro: "Please continue responding based on your experience with the last two passages.", blocks: ["cmm", "miv"] },
      { title: "Post-Lecture Questions (3 of 3)", intro: "Please continue responding based on your experience with the last two passages.", blocks: ["pni", "gle"] },
    ];
    const page = pages[A.state.postPage];
    const visible = page.blocks.filter((id) => A.data.scales[id].show.includes(A.state.condition));
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">${page.title}</p><h2>Questions About Your Experience</h2><p class="lede">${page.intro}</p></div>
        <form id="postForm" class="card-stack">
          ${visible.map((id) => A.scaleBlock(id, record[id] || {})).join("")}
          <div class="buttons">
            ${A.state.postPage > 0 ? `<button id="prevPost" class="secondary-button" type="button">Previous Page</button>` : ""}
            <button class="primary-button" type="submit">${A.state.postPage === 2 ? "Continue" : "Next"}</button>
          </div>
        </form>
      </section>`;
    const prev = document.getElementById("prevPost");
    if (prev) prev.addEventListener("click", () => A.go("post", { postPage: A.state.postPage - 1 }));
    document.getElementById("postForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      for (const id of visible) {
        const block = A.data.scales[id];
        const out = {};
        for (let i = 0; i < block.items.length; i += 1) {
          const v = fd.get(`${id}_${i + 1}`);
          if (!v) return window.alert("Please answer every visible survey item before continuing.");
          out[`item${i + 1}`] = Number(v);
        }
        record[id] = out;
      }
      record[`page${A.state.postPage + 1}SubmittedAt`] = new Date().toISOString();
      record[`page${A.state.postPage + 1}DurationSec`] = A.diffSeconds(
        record[`page${A.state.postPage + 1}StartedAt`],
        record[`page${A.state.postPage + 1}SubmittedAt`]
      );
      record.updatedAt = new Date().toISOString();
      A.saveState();
      if (A.state.postPage < 2) return A.go("post", { postPage: A.state.postPage + 1 });
      if (A.state.lectureIndex === A.data.lectures.length - 1) return A.go(A.state.condition === "C1" ? "reflection" : "final-image");
      A.go("break");
    });
  },

  scaleBlock(id, answers) {
    const A = window.LAB2;
    const b = A.data.scales[id];
    return `<fieldset class="scale-block"><legend>${A.esc(b.title)}</legend><p class="scale-description">${A.esc(b.desc)}</p>${b.items.map((item, i) => `<div class="likert-card"><label class="question-meta" for="${id}_${i + 1}_1">${i + 1}. ${A.esc(item)}</label><div class="likert-options">${Array.from({ length: 7 }, (_, k) => {
      const v = k + 1;
      return `<label class="likert-choice" for="${id}_${i + 1}_${v}"><span>${v}</span><input id="${id}_${i + 1}_${v}" name="${id}_${i + 1}" type="radio" value="${v}"${A.checked(String(answers[`item${i + 1}`] || ""), String(v))} /></label>`;
    }).join("")}</div><div class="likert-endpoints"><span>${A.esc(b.low)}</span><span>${A.esc(b.high)}</span></div></div>`).join("")}</fieldset>`;
  },

  renderBreak() {
    const A = window.LAB2;
    const current = A.lecture();
    const next = A.data.lectures[A.state.lectureIndex + 1];
    A.root.innerHTML = `
      <section class="card card-stack">
        <div><p class="section-eyebrow">Brief Break</p><h2>${A.state.lectureIndex === 0 ? "Pre-Test Complete" : `${current.n} of ${A.data.lectures.length} Lectures Completed`}</h2><p class="lede">${next ? (A.state.lectureIndex === 0 ? "Well done - you have completed the first lecture. You are about to begin the main part of the study. There are five more lectures." : `Good work - you have completed lecture ${current.n} of ${A.data.lectures.length}. You may take a brief break before continuing to the next lecture.`) : "You have completed the final lecture block."}</p></div>
        <div class="summary-panel"><strong>Suggested pause</strong><span id="breakCountdown">30 seconds</span></div>
        <div class="buttons"><button id="continueBreak" class="primary-button" type="button">${next ? `Continue to Lecture ${next.n}` : "Continue"}</button></div>
      </section>`;
    const label = document.getElementById("breakCountdown");
    let secs = 30;
    A.breakTimer = setInterval(() => {
      secs -= 1;
      label.textContent = secs > 0 ? `${secs} seconds` : "Break complete";
      if (secs <= 0) {
        clearInterval(A.breakTimer);
        A.breakTimer = null;
      }
    }, 1000);
    document.getElementById("continueBreak").addEventListener("click", () => {
      if (!next) return A.go(A.state.condition === "C1" ? "reflection" : "final-image");
      A.go("lecture-intro", { lectureIndex: A.state.lectureIndex + 1 });
    });
  },
});
