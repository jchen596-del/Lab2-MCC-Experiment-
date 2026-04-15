const lectures = [
  {
    id: 'pretest',
    title: 'Lecture 1 — Pre-Test (Audio 1)',
    description: 'Listen to the lecture and answer comprehension questions. No image is shown for this pre-test lecture.',
    audio: 'audio1.mp3',
    imageMode: 'none',
    questions: [
      {
        id: 'pre1_q1',
        prompt: 'What is the main topic of the lecture?',
        options: [
          'The differences between African and non-African savanna ecosystems',
          'Why climate is the most important factor shaping all grassland ecosystems',
          'The central role of fire in maintaining savanna vegetation',
          'How savannas are being threatened by human agricultural activity',
          'The types of animals that have adapted to survive bushfires in Africa'
        ],
        correct: 2,
      },
      {
        id: 'pre1_q2',
        prompt: 'According to the professor, why do high-rainfall savannas still experience frequent fires?',
        options: [
          'High rainfall directly causes lightning, which frequently ignites grassland fires',
          'Trees in high-rainfall savannas have thinner bark and burn more easily',
          'Government land-management policies require annual controlled burns',
          'High rainfall prevents plant roots from absorbing water, making vegetation combustible',
          'These areas experience dry seasons during which tall, dry grass burns very easily'
        ],
        correct: 4,
      },
      {
        id: 'pre1_q3',
        prompt: 'According to the professor, what is the key advantage of vegetative regeneration after a fire?',
        options: [
          'Plants that reproduce by seeds can disperse more widely after a fire clears the area',
          'Vegetative plants produce a chemical coating that repels flames during the fire',
          'These plants can sprout from underground buds without needing seeds',
          'Vegetative regeneration allows plants to absorb carbon released during combustion',
          'Plants with vegetative regeneration grow taller than seed-reproducing species'
        ],
        correct: 2,
      },
      {
        id: 'pre1_q4',
        prompt: 'What does the professor imply about crown fires in savanna ecosystems?',
        options: [
          'Crown fires are the most destructive type of fire in high-rainfall savannas',
          'Crown fires spread primarily because savanna grasses are highly flammable',
          'Crown fires in savannas are started by lightning strikes more often than by humans',
          'Crown fires are rare in savannas because trees are widely spaced with high crowns',
          'Crown fires are difficult to control because savanna trees have very thin bark'
        ],
        correct: 3,
      },
    ],
  },
  {
    id: 'post1',
    title: 'Lecture 2 — Post-Test 1',
    description: 'Listen to the lecture and answer comprehension questions. Condition-specific image displays begin here.',
    audio: 'audio2.mp3',
    imageMode: 'static',
    questions: [
      {
        id: 'post1_q1',
        prompt: 'What is the lecture mainly about?',
        options: [
          'The religious practices associated with Arctic indigenous peoples',
          'How polar bears became symbols in Arctic Canadian art',
          'The excavation and dating of Dorset artifacts across Arctic Canada',
          'The distinct artistic traditions of the Dorset and Tully Arctic cultures',
          'Why the Tully culture never developed sculptural art forms'
        ],
        correct: 3,
      },
      {
        id: 'post1_q2',
        prompt: 'According to the professor, why did the Dorset people likely portray polar bears in a stylized rather than realistic manner?',
        options: [
          'Ivory was too soft a material to enable highly realistic carving',
          'The Dorset people had not yet encountered real polar bears in the wild',
          'Realistic animal sculptures were considered disrespectful to the animal's spirit',
          'The Tully people had already claimed the realistic style for their own art',
          'Animals that were feared or respected were more likely to be represented in a stylized way'
        ],
        correct: 4,
      },
      {
        id: 'post1_q3',
        prompt: 'According to the professor, what is most distinctive about Tully artistic production?',
        options: [
          'Tully artists created large-scale stone sculptures depicting mythological events',
          'Tully art depicted only human figures, never animals',
          'Tully artworks were primarily used for religious ceremonies and offerings',
          'Tully art consisted mainly of engravings on everyday objects such as tools, jewelry, and combs',
          'Tully artists drew their main inspiration from the earlier Dorset tradition'
        ],
        correct: 3,
      },
      {
        id: 'post1_q4',
        prompt: 'What does the professor imply about the carved Dorset horns with many human faces?',
        options: [
          'They were exchanged between Dorset and Tully communities as diplomatic gifts',
          'They depict the specific rulers who governed Dorset Arctic settlements',
          'They are the most common type of artifact uncovered at Dorset excavation sites',
          'Scientific analysis has confirmed they represent Dorset religious deities',
          'Scholars remain uncertain about whom the faces represent or what purpose the horns served'
        ],
        correct: 4,
      },
    ],
  },
  {
    id: 'post2',
    title: 'Lecture 3 — Post-Test 2',
    description: 'Listen to the lecture and answer comprehension questions. After this lecture, you will complete the mechanism survey.',
    audio: 'audio3.mp3',
    imageMode: 'static',
    questions: [
      {
        id: 'post2_q1',
        prompt: 'What is the lecture mainly about?',
        options: [
          'The artistic life of Robert Barker and his influence on European painting',
          'How perspective problems in art were solved during the early 19th century',
          'The development, characteristics, and eventual decline of panorama paintings',
          'Why panoramas became commercially important in North American cities',
          'The connection between the Realism movement and traditional landscape painting'
        ],
        correct: 2,
      },
      {
        id: 'post2_q2',
        prompt: 'What two achievements does the professor identify as making Robert Barker\'s contribution remarkable?',
        options: [
          'Inventing the word "panorama" and opening the first public art gallery',
          'Painting the first circular canvas and developing aerial perspective as a technique',
          'Securing a patent and popularising panoramas in cities across North America',
          'Designing a new type of canvas material and training other panorama artists',
          'Solving the perspective challenges of circular painting and recognising the need for a specially designed viewing building'
        ],
        correct: 4,
      },
      {
        id: 'post2_q3',
        prompt: 'Why does the professor mention the panorama "A View of Paris from the Roof of the Tuileries"?',
        options: [
          'To show that panoramas depicted only foreign and exotic locations',
          'To demonstrate that the format worked better with cityscapes than with natural scenes',
          'To explain why panoramas became economically unprofitable for their owners',
          'To illustrate that viewers found familiar scenes fascinating when reproduced with complete accuracy',
          'To argue that panoramas were a uniquely French innovation that spread to other countries'
        ],
        correct: 3,
      },
      {
        id: 'post2_q4',
        prompt: 'What does the professor suggest caused the eventual decline of panoramas in the late 19th century?',
        options: [
          'Audiences grew bored once panoramas\' range of subjects was exhausted',
          'Panorama buildings were too expensive for city governments to continue maintaining',
          'Artists found the panorama format too physically demanding to create consistently',
          'Patent restrictions limited the number of panoramas that could be legally constructed',
          'Illustrated newspapers and photography provided realistic images more conveniently'
        ],
        correct: 4,
      },
    ],
  },
  {
    id: 'post3',
    title: 'Lecture 4 — Post-Test 3',
    description: 'Listen to the lecture and answer comprehension questions.',
    audio: 'audio4.mp3',
    imageMode: 'static',
    questions: [
      {
        id: 'post3_q1',
        prompt: 'What is the lecture mainly about?',
        options: [
          'The artistic career of El Greco and his use of contrasting colours',
          'How the human eye evolved to become more sensitive to extreme light conditions',
          'How painters and photographers overcome the technical limitations of capturing a wide range of light',
          'The development of digital cameras and their advantages over traditional film cameras',
          'Why HDR photography is superior to all earlier photographic techniques'
        ],
        correct: 2,
      },
      {
        id: 'post3_q2',
        prompt: 'According to the professor, approximately what is the maximum dynamic range achievable using paint and canvas?',
        options: [
          '50 to 1',
          '1,000 to 1',
          '300 to 1',
          '10,000 to 1',
          '50,000 to 1'
        ],
        correct: 2,
      },
      {
        id: 'post3_q3',
        prompt: 'What does Ansel Adams\' "zone system" allow photographers to do?',
        options: [
          'Take photographs in near-total darkness by dividing available light into zones',
          'Avoid overexposure by restricting each photograph to a single tonal zone',
          'Apply colour correction to black-and-white negatives during the development process',
          'Choose which of ten exposure settings to use based on the shooting environment',
          'Measure and manage tonal ranges consistently by mapping them onto a scale from pure black to pure white'
        ],
        correct: 4,
      },
      {
        id: 'post3_q4',
        prompt: 'What does the professor imply about HDR (High Dynamic Range) photography?',
        options: [
          'It was originally developed in the 1940s for black-and-white film by Ansel Adams',
          'It reduces visible detail in very bright or very dark areas of an image',
          'It works only with certain specialised digital camera models',
          'It requires photographers to use analogue rather than digital equipment',
          'It uses digital software to combine multiple exposures and capture greater detail across the full light range'
        ],
        correct: 4,
      },
    ],
  },
  {
    id: 'post4',
    title: 'Lecture 5 — Post-Test 4',
    description: 'Listen to the lecture and answer comprehension questions.',
    audio: 'audio5.mp3',
    imageMode: 'static',
    questions: [
      {
        id: 'post4_q1',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why neutral information is harder to encode in memory than emotional information',
          'How the Harvard University Brain Research Lab conducts its experimental studies',
          'Research findings about how emotions influence the formation and recall of memories',
          'Why sad people consistently have fewer creative thoughts than happy people',
          'The specific role of the prefrontal cortex in storing long-term emotional memories'
        ],
        correct: 2,
      },
      {
        id: 'post4_q2',
        prompt: 'According to the Harvard study described in the lecture, which images were the easiest for volunteers to remember?',
        options: [
          'Images that were colourful and visually complex',
          'Images that were shown to participants multiple times during the experiment',
          'Images that depicted familiar, everyday objects and scenes',
          'Images that were emotionally positive in content only',
          'Images that generated the strongest emotional response, regardless of whether the emotion was positive or negative'
        ],
        correct: 4,
      },
      {
        id: 'post4_q3',
        prompt: 'What unexpected finding emerged from Damasio\'s brain-scanning experiment?',
        options: [
          'The prefrontal cortex was equally active during both happy and sad emotional memories',
          'Recalling negative memories required more total neural activity than recalling positive ones',
          'The prefrontal cortex stored long-term emotional memories independently of other brain regions',
          'Happy emotions activated more distinct brain regions than sad emotions',
          'When experiencing depression or sadness, the prefrontal cortex showed markedly reduced activity'
        ],
        correct: 1,
      },
      {
        id: 'post4_q4',
        prompt: 'Why does the professor describe the writer Stephen Johnson\'s reaction to Damasio\'s finding?',
        options: [
          'To argue that popular science writers frequently misrepresent neuroscience research',
          'To demonstrate the role of mood congruity in everyday professional creative work',
          'To show that creative professionals are more sensitive to emotional mood changes than others',
          'To challenge the methodology used in Damasio\'s brain-scanning experiment',
          'To illustrate that understanding the neurological basis of low mood can help a person cope with reduced productivity'
        ],
        correct: 4,
      },
    ],
  },
  {
    id: 'post5',
    title: 'Lecture 6 — Post-Test 5',
    description: 'Listen to the lecture and answer comprehension questions. After this lecture, you will complete the final questionnaires.',
    audio: 'audio6.mp3',
    imageMode: 'static',
    questions: [
      {
        id: 'post5_q1',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Whether astronauts have accidentally transported microbes to other planets',
          'The scientific differences between biology, astronomy, and geology as fields of study',
          'How scientists use meteorites to determine the age of Earth\'s geological crust',
          'The field of astrobiology and how microbes might survive travel between planets',
          'Why scientists now have definitive proof of life on other planets'
        ],
        correct: 3,
      },
      {
        id: 'post5_q2',
        prompt: 'According to the professor, what evidence supports the possibility that microbes could have arrived on Earth from another planet?',
        options: [
          'DNA sequences in bacteria closely match organisms found during Mars exploration missions',
          'Cosmic rays have been shown to carry biological material across solar systems',
          'Microbes have been directly observed living in near-Earth orbital space',
          'Antarctic soil samples contain unusually high concentrations of extraterrestrial material',
          'Studies of meteorites found in Antarctica suggest this possibility'
        ],
        correct: 4,
      },
      {
        id: 'post5_q3',
        prompt: 'According to the lecture, how do spores improve a microbe\'s chances of surviving space travel?',
        options: [
          'Spores are lighter than ordinary cells and can travel much farther through space',
          'Spores generate their own energy and therefore do not require food or air',
          'Spores can attach to the surface of asteroids to withstand hypervelocity impacts',
          'Spores can reproduce independently without needing a living host environment',
          'Spores have a protective coating and very few cells, and can survive for millions of years in cold conditions'
        ],
        correct: 4,
      },
      {
        id: 'post5_q4',
        prompt: 'What does the professor imply about the survival of microbes during a rock\'s entry into a planet\'s atmosphere?',
        options: [
          'Any rock entering an atmosphere at high speed will be completely destroyed by frictional heat',
          'Only microbes that have already formed spores can safely enter a planet\'s atmosphere',
          'The frictional heat generated during atmospheric entry is always fatal to any organisms inside a rock',
          'Smaller rocks are safer than large rocks because they pass through the atmosphere more quickly',
          'A sufficiently large rock can maintain a relatively low internal temperature during entry, potentially protecting microbes inside'
        ],
        correct: 4,
      },
    ],
  },
];

const finalSurveyItems = {
  wmo: [
    'I felt mentally overloaded while trying to process the information presented during the lecture.',
    'It was difficult to hold different aspects of the lecture content in my mind at the same time.',
    'Understanding the lecture required a great deal of mental effort.',
    'How mentally demanding was it to follow the lecture? (1 = Very Low, 7 = Very High)',
    'I could process the information in the lecture smoothly without feeling overloaded.',
  ],
  pni: [
    'My experience while listening to this passage felt novel or surprising.',
    'I found the experience of listening to this passage interesting.',
    'The experience of this task felt similar to things I have encountered before.',
    'This listening experience captured my curiosity.',
    'By the end of the passage, I felt less interested in the task than when it began.',
  ],
  miv: [
    'While listening, I formed a clear mental picture of the scene being described.',
    'I found it easy to visualize the characters and setting from the audio.',
    'I was able to form a vivid mental picture of the audio content during this passage.',
    'At some point during this passage, my mental picture of the scenario shifted or became unclear.',
  ],
  acl: [
    'While the audio was playing, I found myself looking at the image rather than focusing on listening.',
    'The image drew my attention away from what the speaker was saying.',
    'I was able to maintain my focus on the audio despite the image being present.',
    'I had to consciously work to stop looking at the image and return to listening.',
    'The image made it difficult for me to follow the spoken content.',
  ],
  cmm: [
    'The image accurately depicted the scenario described in the audio passage.',
    'The scene shown in the image was inconsistent with what I heard in the audio.',
    'The characters/objects in the image matched the description I heard in the audio.',
    'After seeing the image, I formed a mental picture that conflicted with the spoken content.',
    'The image helped me build an accurate mental model of the passage content.',
    'I noticed a mismatch between what the image showed and what the audio described.',
  ],
  gle: [
    'The lecture content was clear and easy to follow.',
    'I felt confident that I understood the main points of this passage.',
    'Following the audio required concentrated mental effort on my part.',
  ],
  imageCheck: [
    'How well did the images displayed during the lectures match the content of what was being said?',
    'How relevant were the images to the main ideas discussed in the lectures?',
    'Overall, to what extent did the images support your understanding of the lecture content?',
  ],
};

const state = {
  screen: 'welcome',
  condition: null,
  participant: {},
  lectureIndex: 0,
  responses: {},
  consentGiven: false,
  eligibilityPassed: false,
};

const root = document.getElementById('app');

function render() {
  switch (state.screen) {
    case 'welcome':
      renderWelcome();
      break;
    case 'consent':
      renderConsent();
      break;
    case 'eligibility':
      renderEligibility();
      break;
    case 'demographics':
      renderDemographics();
      break;
    case 'english-background':
      renderEnglishBackground();
      break;
    case 'instructions':
      renderInstructions();
      break;
    case 'lecture':
      renderLecture();
      break;
    case 'comprehension':
      renderComprehension();
      break;
    case 'mechanism':
      renderMechanism();
      break;
    case 'final':
      renderFinalQuestionnaire();
      break;
    case 'debrief':
      renderDebrief();
      break;
    case 'thankyou':
      renderThankYou();
      break;
    default:
      root.innerHTML = '<div class="panel"><p>Unknown screen.</p></div>';
  }
}

function renderWelcome() {
  root.innerHTML = `
    <section class="panel">
      <h2>Welcome</h2>
      <p>This prototype website implements the Lab 2 experiment flow for the Multimodal Cognitive Conflict study.</p>
      <div class="buttons">
        <button class="button" onclick="goto('consent')">Start the experiment</button>
      </div>
    </section>
  `;
}

function renderConsent() {
  root.innerHTML = `
    <section class="panel">
      <h2>Consent and Participation</h2>
      <p>Please read the consent information and indicate whether you agree to participate.</p>
      <div class="field-group">
        <p><strong>Purpose:</strong> This study examines how people comprehend spoken academic lectures when visual images are shown alongside audio.</p>
        <p><strong>Duration:</strong> Approximately 30-35 minutes.</p>
      </div>
      <div class="field-group">
        <label><input type="radio" name="consent" value="yes" /> I agree to participate.</label>
        <label><input type="radio" name="consent" value="no" /> I do not agree to participate.</label>
      </div>
      <div class="buttons">
        <button class="button" id="consentNext" disabled>Continue</button>
        <button class="button secondary" onclick="goto('welcome')">Back</button>
      </div>
    </section>
  `;
  const radios = Array.from(document.querySelectorAll('input[name="consent"]'));
  const next = document.getElementById('consentNext');
  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      state.consentGiven = radio.value === 'yes';
      next.disabled = false;
    });
  });
  next.addEventListener('click', () => {
    if (!state.consentGiven) {
      alert('Please agree to participate in order to continue.');
      return;
    }
    goto('eligibility');
  });
}

function renderEligibility() {
  root.innerHTML = `
    <section class="panel">
      <h2>Eligibility Check</h2>
      <p>Please confirm that you meet the eligibility requirements for this study.</p>
      <div class="field-group">
        <label><input type="checkbox" id="ageCheck" /> I am 18 years of age or older.</label>
      </div>
      <div class="field-group">
        <label><input type="checkbox" id="englishCheck" /> English is my second or foreign language.</label>
      </div>
      <div class="field-group">
        <label><input type="checkbox" id="deviceCheck" /> I have access to speakers or headphones and a stable internet connection.</label>
      </div>
      <div class="buttons">
        <button class="button" id="eligibilityNext" disabled>Continue</button>
        <button class="button secondary" onclick="goto('consent')">Back</button>
      </div>
    </section>
  `;
  const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  const next = document.getElementById('eligibilityNext');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      next.disabled = !checkboxes.every((box) => box.checked);
    });
  });
  next.addEventListener('click', () => {
    state.eligibilityPassed = true;
    goto('demographics');
  });
}

function renderDemographics() {
  root.innerHTML = `
    <section class="panel">
      <h2>Background Questionnaire</h2>
      <p>Please answer the questions below. Your responses are confidential.</p>
      <div class="field-group">
        <label for="age">What is your age?</label>
        <input id="age" name="age" type="number" min="18" />
      </div>
      <div class="field-group">
        <label for="gender">What is your gender?</label>
        <select id="gender" name="gender">
          <option value="">Select one</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Non-binary / gender diverse</option>
          <option value="prefer_not_say">Prefer not to say</option>
        </select>
      </div>
      <div class="field-group">
        <label for="nativeLanguage">What is your native language?</label>
        <input id="nativeLanguage" name="nativeLanguage" type="text" />
      </div>
      <div class="field-group">
        <label for="education">What is your highest completed level of education?</label>
        <select id="education" name="education">
          <option value="">Select one</option>
          <option value="highschool">Secondary school / high school</option>
          <option value="somecollege">Some college / university (not completed)</option>
          <option value="bachelor">Bachelor's degree</option>
          <option value="master">Master's degree</option>
          <option value="doctorate">Doctoral or professional degree</option>
        </select>
      </div>
      <div class="buttons">
        <button class="button" onclick="saveDemographics()">Continue</button>
        <button class="button secondary" onclick="goto('eligibility')">Back</button>
      </div>
    </section>
  `;
}

function saveDemographics() {
  const age = document.getElementById('age').value.trim();
  const gender = document.getElementById('gender').value;
  const nativeLanguage = document.getElementById('nativeLanguage').value.trim();
  const education = document.getElementById('education').value;

  if (!age || !gender || !nativeLanguage || !education) {
    alert('Please complete all demographic questions.');
    return;
  }

  state.participant.demographics = { age, gender, nativeLanguage, education };
  goto('english-background');
}

function renderEnglishBackground() {
  root.innerHTML = `
    <section class="panel">
      <h2>English Language Background</h2>
      <p>Tell us about your English learning experience.</p>
      <div class="field-group">
        <label for="yearsEnglish">How many years have you been studying English?</label>
        <select id="yearsEnglish">
          <option value="">Select one</option>
          <option value="less1">Less than 1 year</option>
          <option value="1-3">1–3 years</option>
          <option value="4-6">4–6 years</option>
          <option value="7-10">7–10 years</option>
          <option value="more10">More than 10 years</option>
        </select>
      </div>
      <div class="field-group">
        <label for="contexts">In what contexts have you primarily learned English? (Select all that apply)</label>
        <div class="options">
          <label class="option"><input type="checkbox" value="classroom" /> Formal classroom instruction</label>
          <label class="option"><input type="checkbox" value="selfstudy" /> Self-study (books, apps, online resources)</label>
          <label class="option"><input type="checkbox" value="english_env" /> Living or working in an English-speaking environment</label>
          <label class="option"><input type="checkbox" value="informal" /> Informal exposure (films, TV, music, internet)</label>
          <label class="option"><input type="checkbox" value="other" /> Other</label>
        </div>
      </div>
      <div class="field-group">
        <label for="useFrequency">How often do you currently use English in your daily life?</label>
        <select id="useFrequency">
          <option value="">Select one</option>
          <option value="daily">Every day</option>
          <option value="weekly">Several times per week</option>
          <option value="once_week">About once per week</option>
          <option value="occasionally">Occasionally (less than once per week)</option>
        </select>
      </div>
      <div class="field-group">
        <label for="selfProficiency">What is your self-assessed English proficiency level?</label>
        <select id="selfProficiency">
          <option value="">Select one</option>
          <option value="A1">A1 — Beginner</option>
          <option value="A2">A2 — Elementary</option>
          <option value="B1">B1 — Intermediate</option>
          <option value="B2">B2 — Upper-Intermediate</option>
          <option value="C1">C1 — Advanced</option>
        </select>
      </div>
      <div class="field-group">
        <label for="testExperience">Have you taken a standardised English proficiency test?</label>
        <select id="testExperience">
          <option value="">Select one</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div class="field-group">
        <label for="testDetails">If yes, which test and what score?</label>
        <input id="testDetails" type="text" placeholder="TOEFL, IELTS, TOEIC, etc." />
      </div>
      <div class="buttons">
        <button class="button" onclick="saveEnglishBackground()">Continue</button>
        <button class="button secondary" onclick="goto('demographics')">Back</button>
      </div>
    </section>
  `;
}

function saveEnglishBackground() {
  const yearsEnglish = document.getElementById('yearsEnglish').value;
  const useFrequency = document.getElementById('useFrequency').value;
  const selfProficiency = document.getElementById('selfProficiency').value;
  const testExperience = document.getElementById('testExperience').value;
  const testDetails = document.getElementById('testDetails').value.trim();
  const contexts = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((node) => node.value);

  if (!yearsEnglish || !useFrequency || !selfProficiency || !testExperience) {
    alert('Please complete all required background questions.');
    return;
  }

  state.participant.languageBackground = { yearsEnglish, useFrequency, selfProficiency, testExperience, testDetails, contexts };
  assignCondition();
  goto('instructions');
}

function assignCondition() {
  const conditions = ['C1', 'C2', 'C3'];
  const index = Math.floor(Math.random() * conditions.length);
  state.condition = conditions[index];
}

function renderInstructions() {
  root.innerHTML = `
    <section class="panel">
      <h2>Instructions</h2>
      <p>Please read the instructions before starting the study. Follow them carefully during each lecture.</p>
      <ul>
        <li>You will listen to six short lectures. The first lecture is a pre-test with no images.</li>
        <li>After each lecture, you will answer comprehension questions.</li>
        <li>Depending on your assigned condition, some lectures may show visual images while audio plays.</li>
        <li>The “Next” button will be enabled only after the audio finishes.</li>
      </ul>
      <div class="buttons">
        <button class="button" onclick="goto('lecture')">Begin Lecture 1</button>
        <button class="button secondary" onclick="goto('english-background')">Back</button>
      </div>
    </section>
  `;
}

function renderLecture() {
  const lecture = lectures[state.lectureIndex];
  root.innerHTML = `
    <section class="panel">
      <h2>${lecture.title}</h2>
      <p>${lecture.description}</p>
      <div class="audio-block">
        <audio id="lectureAudio" controls preload="none">
          <source src="${lecture.audio}" type="audio/mpeg" />
          Your browser does not support audio playback.
        </audio>
      </div>
      ${renderImagePanel(lecture)}
      <p class="footer-note">Note: This prototype uses placeholder audio sources. Replace with your actual audio files named audio1.mp3 through audio6.mp3 in the same folder.</p>
      <div class="buttons">
        <button class="button" id="beginQuestions" disabled>Continue to questions</button>
      </div>
    </section>
  `;

  const audio = document.getElementById('lectureAudio');
  const beginButton = document.getElementById('beginQuestions');
  audio.addEventListener('ended', () => {
    beginButton.disabled = false;
  });
  beginButton.addEventListener('click', () => goto('comprehension'));
}

function renderImagePanel(lecture) {
  if (lecture.imageMode === 'none' || state.condition === 'C1') {
    return '<div class="image-panel"><p>No image is shown in this condition for this lecture.</p></div>';
  }

  if (state.condition === 'C2') {
    return `
      <div class="image-panel">
        <p><strong>Simple Prompt image (static)</strong></p>
        <p>This image should represent the audio passage with a naive contextual prompt. It is a static visual aid shown during the lecture.</p>
      </div>
    `;
  }

  if (state.condition === 'C3') {
    return `
      <div class="image-panel">
        <p><strong>MAS-generated synchronized images</strong></p>
        <p>These images are aligned to chunks of the audio and should update as the lecture progresses.</p>
      </div>
    `;
  }

  return '<div class="image-panel"><p>Image panel is not available for this lecture.</p></div>';
}

function renderComprehension() {
  const lecture = lectures[state.lectureIndex];
  root.innerHTML = `
    <section class="panel">
      <h2>${lecture.title} — Comprehension Questions</h2>
      <p>Answer the following questions based on the lecture you just heard.</p>
      <form id="questionForm"></form>
      <div class="buttons">
        <button class="button" id="submitAnswers">Submit answers</button>
      </div>
    </section>
  `;
  const form = document.getElementById('questionForm');
  lecture.questions.forEach((question, index) => {
    const questionHtml = document.createElement('div');
    questionHtml.className = 'question-block';
    const optionsHtml = question.options
      .map(
        (option, optionIndex) => `
        <label class="option"><input name="${question.id}" type="radio" value="${optionIndex}" /> ${option}</label>
      `
      )
      .join('');
    questionHtml.innerHTML = `
      <h3>Question ${index + 1}</h3>
      <p>${question.prompt}</p>
      <div class="options">${optionsHtml}</div>
    `;
    form.appendChild(questionHtml);
  });

  document.getElementById('submitAnswers').addEventListener('click', (event) => {
    event.preventDefault();
    saveComprehensionAnswers();
  });
}

function saveComprehensionAnswers() {
  const lecture = lectures[state.lectureIndex];
  const answers = {};
  let valid = true;
  lecture.questions.forEach((question) => {
    const selected = document.querySelector(`input[name="${question.id}"]:checked`);
    if (!selected) {
      valid = false;
    } else {
      answers[question.id] = parseInt(selected.value, 10);
    }
  });

  if (!valid) {
    alert('Please answer all comprehension questions before submitting.');
    return;
  }

  state.responses[lecture.id] = state.responses[lecture.id] || {};
  state.responses[lecture.id].comprehension = answers;

  if (state.lectureIndex === lectures.length - 1) {
    goto('mechanism');
  } else {
    state.lectureIndex += 1;
    if (state.lectureIndex === 2 || state.lectureIndex === 5) {
      goto('mechanism');
    } else {
      goto('lecture');
    }
  }
}

function renderMechanism() {
  const lecture = lectures[state.lectureIndex];
  const isC1 = state.condition === 'C1';
  root.innerHTML = `
    <section class="panel">
      <h2>Mechanism Survey</h2>
      <p>Please answer these questions about your experience during the most recent lecture.</p>
      <form id="mechanismForm"></form>
      <div class="buttons">
        <button class="button" id="submitMechanism">Continue</button>
      </div>
    </section>
  `;

  const form = document.getElementById('mechanismForm');
  if (!isC1) {
    appendScaleBlock(form, 'Attention Control Loss (ACL)', finalSurveyItems.acl, 'acl');
    appendScaleBlock(form, 'Cross-Modal Misrepresentation (CMM)', finalSurveyItems.cmm, 'cmm');
  } else {
    appendScaleBlock(form, 'General Listening Experience (C1 only)', finalSurveyItems.gle, 'gle');
  }
  appendScaleBlock(form, 'Working Memory Overload (WMO)', finalSurveyItems.wmo, 'wmo');
  appendScaleBlock(form, 'Mental Imagery Vividness (MIV)', finalSurveyItems.miv, 'miv');
  appendScaleBlock(form, 'Perceived Novelty and Interest (PNI)', finalSurveyItems.pni, 'pni');

  document.getElementById('submitMechanism').addEventListener('click', (event) => {
    event.preventDefault();
    saveMechanismAnswers();
  });
}

function appendScaleBlock(parent, title, items, blockId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'question-block';
  wrapper.innerHTML = `<h3>${title}</h3>`;
  items.forEach((item, index) => {
    const inputName = `${blockId}_${index}`;
    const optionGroup = document.createElement('div');
    optionGroup.className = 'field-group';
    optionGroup.innerHTML = `
      <label>${item}</label>
      <div class="options">
        ${Array.from({ length: 7 }, (_, i) => `
          <label class="option"><input type="radio" name="${inputName}" value="${i + 1}" /> ${i + 1}</label>
        `).join('')}
      </div>
    `;
    wrapper.appendChild(optionGroup);
  });
  parent.appendChild(wrapper);
}

function saveMechanismAnswers() {
  const lecture = lectures[state.lectureIndex];
  const formValues = {};
  const inputs = Array.from(document.querySelectorAll('#mechanismForm input[type="radio"]'));
  const groups = new Map();
  inputs.forEach((input) => {
    const [group] = input.name.split('_');
    if (!groups.has(input.name)) {
      groups.set(input.name, []);
    }
    groups.get(input.name).push(input);
  });

  let valid = true;
  groups.forEach((items, groupName) => {
    const selected = items.find((item) => item.checked);
    if (!selected) {
      valid = false;
    } else {
      formValues[groupName] = parseInt(selected.value, 10);
    }
  });

  if (!valid) {
    alert('Please answer every survey item before continuing.');
    return;
  }

  state.responses[lecture.id] = state.responses[lecture.id] || {};
  state.responses[lecture.id].mechanism = formValues;

  if (state.lectureIndex === lectures.length - 1) {
    goto('final');
  } else {
    goto('lecture');
  }
}

function renderFinalQuestionnaire() {
  root.innerHTML = `
    <section class="panel">
      <h2>Final Questions</h2>
      <p>Answer the final image-related and debrief questions.</p>
      <form id="finalForm"></form>
      <div class="buttons">
        <button class="button" id="submitFinal">Finish experiment</button>
      </div>
    </section>
  `;

  const form = document.getElementById('finalForm');
  appendScaleBlock(form, 'Image Experience', finalSurveyItems.imageCheck, 'imageCheck');
  const field = document.createElement('div');
  field.className = 'field-group';
  field.innerHTML = `
    <label for="comments">Optional comments about the images or listening experience</label>
    <textarea id="comments" name="comments" placeholder="Your comments here..."></textarea>
  `;
  form.appendChild(field);

  document.getElementById('submitFinal').addEventListener('click', (event) => {
    event.preventDefault();
    saveFinalAnswers();
  });
}

function saveFinalAnswers() {
  const formValues = {};
  const groups = new Map();
  const inputs = Array.from(document.querySelectorAll('#finalForm input[type="radio"]'));
  inputs.forEach((input) => {
    if (!groups.has(input.name)) groups.set(input.name, []);
    groups.get(input.name).push(input);
  });

  let valid = true;
  groups.forEach((items, groupName) => {
    const selected = items.find((item) => item.checked);
    if (!selected) valid = false;
    else formValues[groupName] = parseInt(selected.value, 10);
  });

  if (!valid) {
    alert('Please answer all final survey items before finishing.');
    return;
  }

  formValues.comments = document.getElementById('comments').value.trim();
  state.responses.final = formValues;
  goto('debrief');
}

function renderDebrief() {
  root.innerHTML = `
    <section class="panel">
      <h2>Debriefing</h2>
      <p>Thank you for completing the experiment. This study investigates how audio comprehension changes when visual imagery is shown alongside spoken lectures.</p>
      <p>Your responses are stored locally in this prototype for demonstration purposes.</p>
      <div class="buttons">
        <button class="button" onclick="goto('thankyou')">Continue</button>
      </div>
    </section>
  `;
}

function renderThankYou() {
  const scoreSummary = calculateScoreSummary();
  root.innerHTML = `
    <section class="panel">
      <h2>Thank You</h2>
      <p>Your experiment session is complete.</p>
      <div class="summary-item"><strong>Assigned condition:</strong> ${state.condition}</div>
      <div class="summary-item"><strong>Correct responses recorded:</strong> ${scoreSummary.correct} / ${scoreSummary.total}</div>
      <div class="summary-item"><strong>Raw score:</strong> ${(scoreSummary.correct / scoreSummary.total * 100).toFixed(1)}%</div>
      <p class="footer-note">This is a functional prototype. To deploy a live experiment, connect this frontend to a secure backend service for data collection and storage.</p>
    </section>
  `;
  console.log('Experiment state:', state);
}

function calculateScoreSummary() {
  let correct = 0;
  let total = 0;
  lectures.forEach((lecture) => {
    const response = state.responses[lecture.id]?.comprehension;
    if (!response) return;
    lecture.questions.forEach((question) => {
      if (response[question.id] === question.correct) correct += 1;
      total += 1;
    });
  });
  return { correct, total };
}

function goto(screen) {
  state.screen = screen;
  render();
}

render();
