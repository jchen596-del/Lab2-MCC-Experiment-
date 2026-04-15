const LAB2_C3_TRANSITION_CONFIG = window.LAB2_C3_TRANSITIONS || {};

function parseC3TransitionTime(value) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, value);
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (/^\d+(\.\d+)?$/.test(text)) return Math.max(0, Number(text));
  const parts = text.split(":").map((part) => part.trim());
  if (!parts.length || !parts.every((part) => /^\d+(\.\d+)?$/.test(part))) return null;
  return parts.reduce((total, part) => total * 60 + Number(part), 0);
}

function getC3TransitionMeta(lectureId, chunkCount) {
  const raw = LAB2_C3_TRANSITION_CONFIG[lectureId] || {};
  const keys = ["chunk1To2", "chunk2To3", "chunk3To4", "chunk4To5"];
  const boundaries = keys.slice(0, Math.max(0, chunkCount - 1)).map((key) => raw[key] || {});
  return {
    sentences: boundaries.map((entry) => String(entry.sentence || "").trim()),
    times: boundaries.map((entry) => parseC3TransitionTime(entry.time)),
  };
}

window.LAB2_DATA = {
  postSurveyAfter: [2, 5],
  scales: {
    acl: {
      title: "Part A: ACL",
      desc: "Indicate the extent to which you agree with each statement for the last two passages. (1 = Strongly Disagree, 7 = Strongly Agree)",
      low: "Strongly disagree",
      high: "Strongly agree",
      show: ["C2", "C3"],
      items: [
        "While the audio was playing, I found myself looking at the image rather than focusing on listening.",
        "The image drew my attention away from what the speaker was saying.",
        "I was able to maintain my focus on the audio despite the image being present.",
        "I had to consciously work to stop looking at the image and return to listening.",
        "The image made it difficult for me to follow the spoken content."
      ]
    },
    wmo: {
      title: "Part B: WMO",
      desc: "Indicate the extent to which you agree with each statement for the last two passages. (1 = Strongly Disagree, 7 = Strongly Agree)",
      low: "Strongly disagree",
      high: "Strongly agree",
      show: ["C1", "C2", "C3"],
      items: [
        "I felt mentally overloaded while trying to process the information presented during the lecture.",
        "It was difficult to hold different aspects of the lecture content in my mind at the same time.",
        "Understanding the lecture required a great deal of mental effort.",
        "How mentally demanding was it to follow the lecture? (1 = Very Low, 7 = Very High)",
        "I could process the information in the lecture smoothly without feeling overloaded."
      ]
    },
    cmm: {
      title: "Part C: CMM",
      desc: "Indicate the extent to which you agree with each statement for the last two passages. (1 = Strongly Disagree, 7 = Strongly Agree)",
      low: "Strongly disagree",
      high: "Strongly agree",
      show: ["C2", "C3"],
      items: [
        "The image accurately depicted the scenario described in the audio passage.",
        "The scene shown in the image was inconsistent with what I heard in the audio.",
        "The characters/objects in the image matched the description I heard in the audio.",
        "After seeing the image, I formed a mental picture that conflicted with the spoken content.",
        "The image helped me build an accurate mental model of the passage content.",
        "I noticed a mismatch between what the image showed and what the audio described."
      ]
    },
    miv: {
      title: "Part D: MIV",
      desc: "Indicate the extent to which you agree with each statement for the last two passages. (1 = Strongly Disagree, 7 = Strongly Agree)",
      low: "Strongly disagree",
      high: "Strongly agree",
      show: ["C1", "C2", "C3"],
      items: [
        "While listening, I formed a clear mental picture of the scene being described.",
        "I found it easy to visualize the characters and setting from the audio.",
        "I was able to form a vivid mental picture of the audio content during this passage.",
        "At some point during this passage, my mental picture of the scenario shifted or became unclear."
      ]
    },
    pni: {
      title: "Part E: PNI",
      desc: "Indicate the extent to which you agree with each statement for the last two passages. (1 = Strongly Disagree, 7 = Strongly Agree)",
      low: "Strongly disagree",
      high: "Strongly agree",
      show: ["C1", "C2", "C3"],
      items: [
        "My experience while listening to this passage felt novel or surprising.",
        "I found the experience of listening to this passage interesting.",
        "The experience of this task felt similar to things I have encountered before.",
        "This listening experience captured my curiosity.",
        "By the end of the passage, I felt less interested in the task than when it began."
      ]
    },
    gle: {
      title: "Part F: GLE",
      desc: "Indicate the extent to which you agree with each statement for the last two passages. (1 = Strongly Disagree, 7 = Strongly Agree)",
      low: "Strongly disagree",
      high: "Strongly agree",
      show: ["C1"],
      items: [
        "The lecture content was clear and easy to follow.",
        "I felt confident that I understood the main points of this passage.",
        "Following the audio required concentrated mental effort on my part."
      ]
    },
    imageCheck: {
      title: "Manipulation Check",
      desc: "Indicate your response using the scale below. (1 = Not at all, 7 = Extremely well)",
      low: "Not at all",
      high: "Extremely well",
      show: ["C2", "C3"],
      items: [
        "How well did the images displayed during the lectures match the content of what was being said?",
        "How relevant were the images to the main ideas discussed in the lectures?",
        "Overall, to what extent did the images support your understanding of the lecture content?"
      ]
    }
  },
  lectures: [
    {
      n: 1,
      id: "lecture1",
      readyTitle: "Lecture 1 of 6 - Pre-Test",
      readyText: "You are about to hear the first lecture. This lecture has no visual display - please listen to the audio only. After the lecture, you will answer four comprehension questions.",
      listenTitle: "Listening: Savanna Fires and Grassland Ecology",
      listenText: "Listen carefully to the lecture. The next button will become active when the audio has finished playing.",
      hint: "~4 min 20 sec",
      audio: "media/audio/audio1.mp3",
      c2: "media/images/web/c2/lecture1.jpg",
      c2Note: "No image is shown during the pre-test in any condition.",
      c3: [],
      chunks: [],
      qs: [
        { id: "lecture1_q1", p: "What is the main topic of the lecture?", o: ["The differences between African and non-African savanna ecosystems", "Why climate is the most important factor shaping all grassland ecosystems", "The central role of fire in maintaining savanna vegetation", "How savannas are being threatened by human agricultural activity", "The types of animals that have adapted to survive bushfires in Africa"], a: 2 },
        { id: "lecture1_q2", p: "According to the professor, why do high-rainfall savannas still experience frequent fires?", o: ["High rainfall directly causes lightning, which frequently ignites grassland fires", "Trees in high-rainfall savannas have thinner bark and burn more easily", "Government land-management policies require annual controlled burns", "High rainfall prevents plant roots from absorbing water, making vegetation combustible", "These areas experience dry seasons during which tall, dry grass burns very easily"], a: 4 },
        { id: "lecture1_q3", p: "According to the professor, what is the key advantage of vegetative regeneration after a fire?", o: ["Plants that reproduce by seeds can disperse more widely after a fire clears the area", "Vegetative plants produce a chemical coating that repels flames during the fire", "These plants can sprout from underground buds without needing seeds", "Vegetative regeneration allows plants to absorb carbon released during combustion", "Plants with vegetative regeneration grow taller than seed-reproducing species"], a: 2 },
        { id: "lecture1_q4", p: "What does the professor imply about crown fires in savanna ecosystems?", o: ["Crown fires are the most destructive type of fire in high-rainfall savannas", "Crown fires spread primarily because savanna grasses are highly flammable", "Crown fires in savannas are started by lightning strikes more often than by humans", "Crown fires are rare in savannas because trees are widely spaced with high crowns", "Crown fires are difficult to control because savanna trees have very thin bark"], a: 3 }
      ]
    },
    {
      n: 2,
      id: "lecture2",
      readyTitle: "Ready for Audio 2 (Post-Test 1)",
      readyText: "You are about to hear Audio 2 (Post-Test 1): Arctic Art Traditions: The Dorset and Tully Cultures. Please listen carefully to the full lecture before answering the questions. You may take notes while listening.",
      listenTitle: "Listening: Arctic Art Traditions: The Dorset and Tully Cultures",
      listenText: "Listen to the lecture. When the audio has finished playing, the next button will become active.",
      hint: "~4-5 minutes",
      audio: "media/audio/audio2.mp3",
      c2: "media/images/web/c2/lecture2.jpg",
      c2Note: "One static image should remain visible throughout this lecture in the simple prompt condition.",
      c3: ["media/images/web/c3/lecture2-chunk1.jpg", "media/images/web/c3/lecture2-chunk2.jpg", "media/images/web/c3/lecture2-chunk3.jpg"],
      chunks: ["Chunk 1: Arctic landscape and Dorset culture introduction", "Chunk 2: Ivory polar bear sculptures and other Dorset carvings", "Chunk 3: Tully art, engravings, and comparison with Dorset"],
      qs: [
        { id: "lecture2_q1", p: "What is the lecture mainly about?", o: ["The religious practices associated with Arctic indigenous peoples", "How polar bears became symbols in Arctic Canadian art", "The excavation and dating of Dorset artifacts across Arctic Canada", "The distinct artistic traditions of the Dorset and Tully Arctic cultures", "Why the Tully culture never developed sculptural art forms"], a: 3 },
        { id: "lecture2_q2", p: "According to the professor, why did the Dorset people likely portray polar bears in a stylized rather than realistic manner?", o: ["Ivory was too soft a material to enable highly realistic carving", "The Dorset people had not yet encountered real polar bears in the wild", "Realistic animal sculptures were considered disrespectful to the animal's spirit", "The Tully people had already claimed the realistic style for their own art", "Animals that were feared or respected were more likely to be represented in a stylized way"], a: 4 },
        { id: "lecture2_q3", p: "According to the professor, what is most distinctive about Tully artistic production?", o: ["Tully artists created large-scale stone sculptures depicting mythological events", "Tully art depicted only human figures, never animals", "Tully artworks were primarily used for religious ceremonies and offerings", "Tully art consisted mainly of engravings on everyday objects such as tools, jewelry, and combs", "Tully artists drew their main inspiration from the earlier Dorset tradition"], a: 3 },
        { id: "lecture2_q4", p: "What does the professor imply about the carved Dorset horns with many human faces?", o: ["They were exchanged between Dorset and Tully communities as diplomatic gifts", "They depict the specific rulers who governed Dorset Arctic settlements", "They are the most common type of artifact uncovered at Dorset excavation sites", "Scientific analysis has confirmed they represent Dorset religious deities", "Scholars remain uncertain about whom the faces represent or what purpose the horns served"], a: 4 }
      ]
    },
    {
      n: 3,
      id: "lecture3",
      readyTitle: "Ready for Audio 3 (Post-Test 2)",
      readyText: "You are about to hear Audio 3 (Post-Test 2): The Rise and Fall of Panorama Paintings. Please listen carefully to the full lecture before answering the questions. You may take notes while listening.",
      listenTitle: "Listening: The Rise and Fall of Panorama Paintings",
      listenText: "Listen to the lecture. When the audio has finished playing, the next button will become active.",
      hint: "~4-5 minutes",
      audio: "media/audio/audio3.mp3",
      c2: "media/images/web/c2/lecture3.jpg",
      c2Note: "One static image should remain visible throughout this lecture in the simple prompt condition.",
      c3: ["media/images/web/c3/lecture3-chunk1.jpg", "media/images/web/c3/lecture3-chunk2.jpg", "media/images/web/c3/lecture3-chunk3.jpg"],
      chunks: ["Chunk 1: Introduction to panoramas; Robert Barker's innovations (1787)", "Chunk 2: Barker's patent, the London building, and spread of panoramas", "Chunk 3: Realism tradition, familiar subjects, and eventual decline"],
      qs: [
        { id: "lecture3_q1", p: "What is the lecture mainly about?", o: ["The artistic life of Robert Barker and his influence on European painting", "How perspective problems in art were solved during the early 19th century", "The development, characteristics, and eventual decline of panorama paintings", "Why panoramas became commercially important in North American cities", "The connection between the Realism movement and traditional landscape painting"], a: 2 },
        { id: "lecture3_q2", p: "What two achievements does the professor identify as making Robert Barker's contribution remarkable?", o: ["Inventing the word \"panorama\" and opening the first public art gallery", "Painting the first circular canvas and developing aerial perspective as a technique", "Securing a patent and popularising panoramas in cities across North America", "Designing a new type of canvas material and training other panorama artists", "Solving the perspective challenges of circular painting and recognising the need for a specially designed viewing building"], a: 4 },
        { id: "lecture3_q3", p: "Why does the professor mention the panorama \"A View of Paris from the Roof of the Tuileries\"?", o: ["To show that panoramas depicted only foreign and exotic locations", "To demonstrate that the format worked better with cityscapes than with natural scenes", "To explain why panoramas became economically unprofitable for their owners", "To illustrate that viewers found familiar scenes fascinating when reproduced with complete accuracy", "To argue that panoramas were a uniquely French innovation that spread to other countries"], a: 3 },
        { id: "lecture3_q4", p: "What does the professor suggest caused the eventual decline of panoramas in the late 19th century?", o: ["Audiences grew bored once panoramas' range of subjects was exhausted", "Panorama buildings were too expensive for city governments to continue maintaining", "Artists found the panorama format too physically demanding to create consistently", "Patent restrictions limited the number of panoramas that could be legally constructed", "Illustrated newspapers and photography provided realistic images more conveniently"], a: 4 }
      ]
    },
    {
      n: 4,
      id: "lecture4",
      readyTitle: "Ready for Audio 4 (Post-Test 3)",
      readyText: "You are about to hear Audio 4 (Post-Test 3): Perceptual Dynamic Range and Photography. Please listen carefully to the full lecture before answering the questions. You may take notes while listening.",
      listenTitle: "Listening: Perceptual Dynamic Range and Photography",
      listenText: "Listen to the lecture. When the audio has finished playing, the next button will become active.",
      hint: "~4-5 minutes",
      audio: "media/audio/audio4.mp3",
      c2: "media/images/web/c2/lecture4.jpg",
      c2Note: "One static image should remain visible throughout this lecture in the simple prompt condition.",
      c3: ["media/images/web/c3/lecture4-chunk1.jpg", "media/images/web/c3/lecture4-chunk2.jpg", "media/images/web/c3/lecture4-chunk3.jpg"],
      chunks: ["Chunk 1: Perceptual dynamic range; painters' limitations vs. human vision", "Chunk 2: El Greco's techniques; contrasting colours and outlines", "Chunk 3: Traditional photography limits; Ansel Adams' zone system; HDR photography"],
      qs: [
        { id: "lecture4_q1", p: "What is the lecture mainly about?", o: ["The artistic career of El Greco and his use of contrasting colours", "How the human eye evolved to become more sensitive to extreme light conditions", "How painters and photographers overcome the technical limitations of capturing a wide range of light", "The development of digital cameras and their advantages over traditional film cameras", "Why HDR photography is superior to all earlier photographic techniques"], a: 2 },
        { id: "lecture4_q2", p: "According to the professor, approximately what is the maximum dynamic range achievable using paint and canvas?", o: ["50 to 1", "1,000 to 1", "300 to 1", "10,000 to 1", "50,000 to 1"], a: 2 },
        { id: "lecture4_q3", p: "What does Ansel Adams' \"zone system\" allow photographers to do?", o: ["Take photographs in near-total darkness by dividing available light into zones", "Avoid overexposure by restricting each photograph to a single tonal zone", "Apply colour correction to black-and-white negatives during the development process", "Choose which of ten exposure settings to use based on the shooting environment", "Measure and manage tonal ranges consistently by mapping them onto a scale from pure black to pure white"], a: 4 },
        { id: "lecture4_q4", p: "What does the professor imply about HDR (High Dynamic Range) photography?", o: ["It was originally developed in the 1940s for black-and-white film by Ansel Adams", "It reduces visible detail in very bright or very dark areas of an image", "It works only with certain specialised digital camera models", "It requires photographers to use analogue rather than digital equipment", "It uses digital software to combine multiple exposures and capture greater detail across the full light range"], a: 4 }
      ]
    },
    {
      n: 5,
      id: "lecture5",
      readyTitle: "Ready for Audio 5 (Post-Test 4)",
      readyText: "You are about to hear Audio 5 (Post-Test 4): Emotions, Memory, and the Brain. Please listen carefully to the full lecture before answering the questions. You may take notes while listening.",
      listenTitle: "Listening: Emotions, Memory, and the Brain",
      listenText: "Listen to the lecture. When the audio has finished playing, the next button will become active.",
      hint: "~4-5 minutes",
      audio: "media/audio/audio5.mp3",
      c2: "media/images/web/c2/lecture5.jpg",
      c2Note: "One static image should remain visible throughout this lecture in the simple prompt condition.",
      c3: ["media/images/web/c3/lecture5-chunk1.jpg", "media/images/web/c3/lecture5-chunk2.jpg", "media/images/web/c3/lecture5-chunk3.jpg"],
      chunks: ["Chunk 1: Harvard study - emotional images and recall", "Chunk 2: Damasio's brain-scanning experiment; why negative detail is remembered more", "Chunk 3: Mood congruity; prefrontal cortex activity; Stephen Johnson's insight"],
      qs: [
        { id: "lecture5_q1", p: "What is the lecture mainly about?", o: ["Why neutral information is harder to encode in memory than emotional information", "How the Harvard University Brain Research Lab conducts its experimental studies", "Research findings about how emotions influence the formation and recall of memories", "Why sad people consistently have fewer creative thoughts than happy people", "The specific role of the prefrontal cortex in storing long-term emotional memories"], a: 2 },
        { id: "lecture5_q2", p: "According to the Harvard study described in the lecture, which images were the easiest for volunteers to remember?", o: ["Images that were colourful and visually complex", "Images that were shown to participants multiple times during the experiment", "Images that depicted familiar, everyday objects and scenes", "Images that were emotionally positive in content only", "Images that generated the strongest emotional response, regardless of whether the emotion was positive or negative"], a: 4 },
        { id: "lecture5_q3", p: "What unexpected finding emerged from Damasio's brain-scanning experiment?", o: ["The prefrontal cortex was equally active during both happy and sad emotional memories", "Recalling negative memories required more total neural activity than recalling positive ones", "The prefrontal cortex stored long-term emotional memories independently of other brain regions", "Happy emotions activated more distinct brain regions than sad emotions", "When experiencing depression or sadness, the prefrontal cortex showed markedly reduced activity"], a: 4 },
        { id: "lecture5_q4", p: "Why does the professor describe the writer Stephen Johnson's reaction to Damasio's finding?", o: ["To argue that popular science writers frequently misrepresent neuroscience research", "To demonstrate the role of mood congruity in everyday professional creative work", "To show that creative professionals are more sensitive to emotional mood changes than others", "To challenge the methodology used in Damasio's brain-scanning experiment", "To illustrate that understanding the neurological basis of low mood can help a person cope with reduced productivity"], a: 4 }
      ]
    },
    {
      n: 6,
      id: "lecture6",
      readyTitle: "Ready for Audio 6 (Post-Test 5)",
      readyText: "You are about to hear Audio 6 (Post-Test 5): Astrobiology and Microbial Space Travel. Please listen carefully to the full lecture before answering the questions. You may take notes while listening.",
      listenTitle: "Listening: Astrobiology and Microbial Space Travel",
      listenText: "Listen to the lecture. When the audio has finished playing, the next button will become active.",
      hint: "~4-5 minutes",
      audio: "media/audio/audio6.mp3",
      c2: "media/images/web/c2/lecture6.jpg",
      c2Note: "One static image should remain visible throughout this lecture in the simple prompt condition.",
      c3: ["media/images/web/c3/lecture6-chunk1.jpg", "media/images/web/c3/lecture6-chunk2.jpg", "media/images/web/c3/lecture6-chunk3.jpg"],
      chunks: ["Chunk 1: What is astrobiology; microbes and meteorite evidence", "Chunk 2: Asteroid impact mechanism for inter-planetary transport", "Chunk 3: Spore survival in space; atmospheric entry and surface impact"],
      qs: [
        { id: "lecture6_q1", p: "What is the lecture mainly about?", o: ["Whether astronauts have accidentally transported microbes to other planets", "The scientific differences between biology, astronomy, and geology as fields of study", "How scientists use meteorites to determine the age of Earth's geological crust", "The field of astrobiology and how microbes might survive travel between planets", "Why scientists now have definitive proof of life on other planets"], a: 3 },
        { id: "lecture6_q2", p: "According to the professor, what evidence supports the possibility that microbes could have arrived on Earth from another planet?", o: ["DNA sequences in bacteria closely match organisms found during Mars exploration missions", "Cosmic rays have been shown to carry biological material across solar systems", "Microbes have been directly observed living in near-Earth orbital space", "Antarctic soil samples contain unusually high concentrations of extraterrestrial material", "Studies of meteorites found in Antarctica suggest this possibility"], a: 4 },
        { id: "lecture6_q3", p: "According to the lecture, how do spores improve a microbe's chances of surviving space travel?", o: ["Spores are lighter than ordinary cells and can travel much farther through space", "Spores generate their own energy and therefore do not require food or air", "Spores can attach to the surface of asteroids to withstand hypervelocity impacts", "Spores can reproduce independently without needing a living host environment", "Spores have a protective coating and very few cells, and can survive for millions of years in cold conditions"], a: 4 },
        { id: "lecture6_q4", p: "What does the professor imply about the survival of microbes during a rock's entry into a planet's atmosphere?", o: ["Any rock entering an atmosphere at high speed will be completely destroyed by frictional heat", "Only microbes that have already formed spores can safely enter a planet's atmosphere", "The frictional heat generated during atmospheric entry is always fatal to any organisms inside a rock", "Smaller rocks are safer than large rocks because they pass through the atmosphere more quickly", "A sufficiently large rock can maintain a relatively low internal temperature during entry, potentially protecting microbes inside"], a: 4 }
      ]
    }
  ]
};

window.LAB2_DATA.lectures = window.LAB2_DATA.lectures.map((lecture) => {
  const meta = getC3TransitionMeta(lecture.id, Array.isArray(lecture.c3) ? lecture.c3.length : 0);
  return {
    ...lecture,
    c3TransitionSentences: meta.sentences,
    c3TransitionTimes: meta.times,
  };
});
