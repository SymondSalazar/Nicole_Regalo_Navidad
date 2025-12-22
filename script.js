const lyricsData = [
  { time: 1, text: "Qué bonitos tus ojitos," },
  { time: 5, text: "Como obsidianas en calma" },
  { time: 9, text: "Y tu nariz pronunciada," },
  { time: 11, text: "Que pareciera tallada<br>con agua del río Grijalva," },
  { time: 17, text: "Y qué bonito tu acento," },
  { time: 21, text: "como canción de calandria," },
  {
    time: 25,
    text: "Qué lindo tu movimiento,",
  },
  {
    time: 27,
    text: "Como canoa con el viento,",
  },
  { time: 29, text: "Flotando en el papaloapan," },
  { time: 34, text: "Ay morena morenita," },
  { time: 38, text: "Eres mi artesanía favorita," },
  { time: 43, text: "Mi razón, pues de son," },
  { time: 47, text: "Ay morena tu carita" },
  { time: 50, text: "Y esas trenzas como de una muñequita," },
  { time: 55, text: "Son un milagrito bajo el sol." },
  {
    time: 74,
    text: "Y qué fresquita la sombra",
  },
  {
    time: 77,
    text: "Que te dibuja el sombrero ",
  },
  { time: 81, text: "Que preciosura <br/>el pigmento de barro" },
  { time: 84, text: "Y cobre contento que tiene tu cuerpo entero" },
  { time: 90, text: "Tú huipilito de flores atrae <br/>a las mariposas," },
  { time: 98, text: "Con bota larga o reboso," },
  { time: 100, text: "Pones al cielo celoso de tu silueta preciosa," },
  { time: 107, text: "Ay morena morenita," },
  { time: 111, text: "Eres mi artesanía favorita," },
  { time: 116, text: "Mi razón pues de son." },
  { time: 119, text: "Ay morena tu carita y esas.." },
  { time: 124, text: "Trenzas como de una muñequita," },
  { time: 128, text: "Son un milagrito bajo" },
  { time: 132, text: "El sol." },
  { time: 147, text: "Morenita de barro" },
  {
    time: 150,
    text: "Morenita al sol,<br>te planté un saguaro en mi corazón,",
  },
  {
    time: 156,
    text: "Morenita de barro, morenita al sol,<br>te planté un saguaro,",
  },
  { time: 162, text: "En mi corazón ay morena," },
  { time: 168, text: "Ayyy morena," },
  { time: 172, text: "Ay moreeena," },
  { time: 180, text: "Tu eres ese milagrito" },
  { time: 186, text: "Bajo el sol." },
];

const startBtn = document.getElementById("start-btn");
const continueBtn = document.getElementById("continue-btn");
const restartBtn = document.getElementById("restart-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const messageScreen = document.getElementById("message-screen");
const lyricsScreen = document.getElementById("lyrics-screen");
const endScreen = document.getElementById("end-screen");
const audioPlayer = document.getElementById("audio-player");
const currentLineEl = document.getElementById("current-line");

let currentLyricIndex = -1;

// Iniciar experiencia - mostrar mensaje
startBtn.addEventListener("click", () => {
  welcomeScreen.style.opacity = "0";
  setTimeout(() => {
    welcomeScreen.classList.add("hidden");
    messageScreen.classList.remove("hidden");
    setTimeout(() => {
      messageScreen.style.opacity = "1";
    }, 100);
  }, 1000);
});

// Continuar a las letras y reproducir música
continueBtn.addEventListener("click", () => {
  messageScreen.style.opacity = "0";
  setTimeout(() => {
    messageScreen.classList.add("hidden");
    lyricsScreen.classList.remove("hidden");
    setTimeout(() => {
      lyricsScreen.style.opacity = "1";
      audioPlayer.play();
      startSync();
    }, 500);
  }, 1000);
});

// Reiniciar todo
restartBtn.addEventListener("click", () => {
  endScreen.style.opacity = "0";
  setTimeout(() => {
    endScreen.classList.add("hidden");
    lyricsScreen.classList.remove("hidden");
    currentLyricIndex = -1;
    currentLineEl.classList.remove("visible-lyric");
    audioPlayer.currentTime = 0;
    setTimeout(() => {
      lyricsScreen.style.opacity = "1";
      audioPlayer.play();
      startSync();
    }, 500);
  }, 1000);
});

// Detectar cuando termina la música
audioPlayer.addEventListener("ended", () => {
  setTimeout(() => {
    lyricsScreen.style.opacity = "0";
    setTimeout(() => {
      lyricsScreen.classList.add("hidden");
      endScreen.classList.remove("hidden");
      setTimeout(() => {
        endScreen.style.opacity = "1";
      }, 100);
    }, 1000);
  }, 2000); // Espera 2 segundos después de terminar
});

// Función para actualizar la letra basándose en el tiempo actual
function updateLyrics(currentTime) {
  let newIndex = -1;

  for (let i = 0; i < lyricsData.length; i++) {
    if (currentTime >= lyricsData[i].time) {
      newIndex = i;
    } else {
      break;
    }
  }

  if (newIndex !== currentLyricIndex) {
    currentLyricIndex = newIndex;

    if (newIndex >= 0) {
      currentLineEl.classList.remove("visible-lyric");
      setTimeout(() => {
        currentLineEl.innerHTML = lyricsData[newIndex].text;
        currentLineEl.classList.add("visible-lyric");
      }, 100);
    } else {
      currentLineEl.classList.remove("visible-lyric");
    }
  }
}

// Bucle principal de sincronización
function startSync() {
  requestAnimationFrame(checkTime);
}

function checkTime() {
  const currentTime = audioPlayer.currentTime;
  updateLyrics(currentTime);

  if (!audioPlayer.ended) {
    requestAnimationFrame(checkTime);
  }
}
