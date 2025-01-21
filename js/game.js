// Animal names
const animalNames = [
  "owl",
  "sheep",
  "elephant",
  "moose",
  "raccoon",
  "tiger",
  "turtle",
  "rooster",
  "dog",
  "lion",
  "turkey",
  "horse",
  "zebra",
  "pig",
  "ape",
  "cat",
  "cow",
  "duck",
];

// base url for sounds and images
const url = "https://google.com/logos/fnbx/animal_sounds/";

// select a random animmal on page loads
const currentAnimal = animalNames[Math.floor(Math.random() * (animalNames.length))];

// DOM variables
let result = document.getElementById("result");
const instructionsAudio = document.getElementById("instructionsAudio");
const wrongAnswerAudio = document.getElementById("wrongAnswerAudio");
const animalAudio = document.getElementById("animalAudio");
let playInstructionsBtn = document.getElementById("playInstructionsBtn");
const playAnimalSoundBtn = document.getElementById("playSound");
const micRecordBtn = document.getElementById("mic");
const hintImage = document.getElementById("hint");
const hintBtn = document.getElementById("hintBtn")

// Event listeners
playAnimalSoundBtn.addEventListener("click", playAnimalSound);
playInstructionsBtn.addEventListener("click", playInstructionSound);
micRecordBtn.addEventListener("click", startRecording);
hintBtn.addEventListener("click", showHintImage)

// Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

// Recognition configuration
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// start recording function
// function startRecording() {
//   recognition.start();
// }

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      recognition.start();
    })
    .catch(function(err) {
      console.log('No mic for you!')
    });
}

// After recognition completes
recognition.onresult = (event) => {
  const spokenWord = event.results[0][0].transcript;
  if (spokenWord.trim().toLowerCase() == currentAnimal.trim().toLowerCase()) {
    window.location.href = "congratsSpeech.html";
  } else {
    result.innerText = "X Nope! Try again! Would you like a hint?";
    playWrongAnswerSound();
  }
  recognition.stop();
};

// stop once a single word has been recognized and it has finished being spoken:
recognition.onspeechend = () => {
  recognition.stop();
};

// Not recognized
recognition.onnomatch = (event) => {
  result.innerText = "X Nope! Try again! Would you like a hint?"
};

// Error handler
recognition.onerror = (event) => {
  result.innerText = "Error Occured. Please refresh the page and try again.";
};

function loadAnimalData() {
  animalAudio.src = `${url}${currentAnimal}.mp3`
  hintImage.src = `${url}${currentAnimal}.png`
}

function playAnimalSound() {
  animalAudio.play();
}

function playInstructionSound() {
  instructionsAudio.play();
}
function playWrongAnswerSound() {
  wrongAnswerAudio.play();
}
function goBack() {
  location.reload();
}

function showWinningPage() {
  document.getElementById("play-area").style.display = "none";
  document.getElementById("win-area").style.display = "block";
}

function showHintImage() {
  hintImage.style.display = "block";
}

loadAnimalData();
playInstructionSound();