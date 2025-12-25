// --- DATOS DE LA CANCIÓN ---
const lyricsData = [
  { time: 1, text: "Qué bonitos tus ojitos," },
  { time: 5, text: "Como obsidianas en calma" },
  { time: 9, text: "Y tu nariz pronunciada," },
  { time: 11, text: "Que pareciera tallada<br>con agua del río Grijalva," },
  { time: 17, text: "Y qué bonito tu acento," },
  { time: 21, text: "como canción de calandria," },
  { time: 25, text: "Qué lindo tu movimiento," },
  { time: 27, text: "Como canoa con el viento," },
  { time: 29, text: "Flotando en el papaloapan," },
  { time: 34, text: "      Ay morena morenita,     " },
  { time: 38, text: "  Eres mi artesanía favorita, " },
  { time: 43, text: "Mi razón, pues de son," },
  { time: 47, text: "Ay morena tu carita" },
  { time: 50, text: "Y esas trenzas como de una muñequita," },
  { time: 55, text: "Son un milagrito bajo el sol." },
  { time: 60, text: "" },
  { time: 74, text: "Y qué fresquita la sombra" },
  { time: 77, text: "Que te dibuja el sombrero " },
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
  { time: 150, text: "Morenita al sol," },
  { time: 153, text: "Te planté un saguaro en mi corazón," },
  { time: 156, text: "Morenita de barro" },
  { time: 159, text: "Morenita al sol,<br>te planté un saguaro," },
  { time: 162, text: "En mi corazón, ay morena," },
  { time: 168, text: "Ayyy morena," },
  { time: 172, text: "Ay moreeena," },
  { time: 180, text: "Tu eres ese milagrito" },
  { time: 186, text: "Bajo el sol." },
];

// --- DATOS DE IMÁGENES ---
// position: 'left', 'center', 'right'
const imagesData = [
  // PRUEBA: Las imágenes deben aparecer separadas
  { timeIn: 1, timeOut: 8, file: "ojitos3.jpeg", position: "center" },
  { timeIn: 47, timeOut: 53, file: "carita.jpeg", position: "center" },
  { timeIn: 81, timeOut: 89, file: "cobre.jpeg", position: "center" },
  { timeIn: 119, timeOut: 126, file: "morena2.jpeg", position: "center" },
  { timeIn: 153, timeOut: 160, file: "nose.jpeg", position: "center" },
  { timeIn: 180, timeOut: 189, file: "guapa.jpeg", position: "center" },
];

// --- DATOS DE VIDEOS (GIFS) ---
const videosData = [
  { start: 9, duration: 5, file: "nariz.gif" },
  { start: 34, duration: 5, file: "morena.gif" },
  { start: 60, duration: 5, file: "sol.gif" },
  { start: 65, duration: 5, file: "morena.gif" },
  { start: 70, duration: 5, file: "sol.gif" },
  { start: 90, duration: 5, file: "flores.gif" },
  { start: 100, duration: 8, file: "silueta.gif" },
  { start: 107, duration: 5, file: "morena.gif" },
  { start: 147, duration: 5, file: "comp2.gif" },
  { start: 168, duration: 5, file: "comp3.gif" },
];

// --- REFERENCIAS AL DOM ---
const startBtn = document.getElementById("start-btn");
const continueBtn = document.getElementById("continue-btn");
const restartBtn = document.getElementById("restart-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const messageScreen = document.getElementById("message-screen");
const lyricsScreen = document.getElementById("lyrics-screen");
const endScreen = document.getElementById("end-screen");
const audioPlayer = document.getElementById("audio-player");
const currentLineEl = document.getElementById("current-line");
const visualsContainer = document.getElementById("visuals-container");

let currentLyricIndex = -1;
let activeImages = [];
let activeVideos = [];

// --- EVENT LISTENERS ---

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

restartBtn.addEventListener("click", () => {
  endScreen.style.opacity = "0";
  setTimeout(() => {
    endScreen.classList.add("hidden");
    lyricsScreen.classList.remove("hidden");
    resetExperience();
    setTimeout(() => {
      lyricsScreen.style.opacity = "1";
      audioPlayer.play();
      startSync();
    }, 500);
  }, 1000);
});

audioPlayer.addEventListener("ended", () => {
  setTimeout(() => {
    lyricsScreen.style.opacity = "0";
    setTimeout(() => {
      lyricsScreen.classList.add("hidden");
      endScreen.classList.remove("hidden");
      visualsContainer.innerHTML = "";
      setTimeout(() => {
        endScreen.style.opacity = "1";
      }, 100);
    }, 1000);
  }, 2000);
});

function resetExperience() {
  currentLyricIndex = -1;
  currentLineEl.classList.remove("visible-lyric", "lyric-with-video");
  currentLineEl.innerHTML = "...";
  audioPlayer.currentTime = 0;
  visualsContainer.innerHTML = "";
  activeImages = [];
  activeVideos = [];
}

// --- LÓGICA DE SINCRONIZACIÓN ---

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

function updateVisuals(currentTime) {
  // GESTIÓN DE IMÁGENES
  imagesData.forEach((imgData, index) => {
    if (
      currentTime >= imgData.timeIn &&
      currentTime < imgData.timeOut &&
      !activeImages.includes(index)
    ) {
      createImageElement(imgData, index);
      activeImages.push(index);
    }

    if (currentTime >= imgData.timeOut && activeImages.includes(index)) {
      removeImageElement(index);
      activeImages = activeImages.filter((id) => id !== index);
    }
  });

  // GESTIÓN DE VIDEOS/GIFS
  videosData.forEach((vidData, index) => {
    const endTime = vidData.start + vidData.duration;

    if (
      currentTime >= vidData.start &&
      currentTime < endTime &&
      !activeVideos.includes(index)
    ) {
      createVideoElement(vidData, index);
      activeVideos.push(index);
      currentLineEl.classList.add("lyric-with-video");
    }

    // Iniciar fade out 1 segundo antes de que termine
    if (
      currentTime >= endTime - 1 &&
      currentTime < endTime &&
      activeVideos.includes(index)
    ) {
      const vidEl = document.getElementById(`vid-${index}`);
      if (vidEl && !vidEl.classList.contains("video-fade-out")) {
        vidEl.classList.add("video-fade-out");
      }
    }

    if (currentTime >= endTime && activeVideos.includes(index)) {
      const vidEl = document.getElementById(`vid-${index}`);
      if (vidEl) vidEl.remove();
      activeVideos = activeVideos.filter((id) => id !== index);
      // Si no hay más videos activos, quitar la clase de sombra
      if (activeVideos.length === 0) {
        currentLineEl.classList.remove("lyric-with-video");
      }
    }
  });
}

// Funciones DOM

function createImageElement(data, index) {
  const wrapper = document.createElement("div");
  wrapper.id = `img-wrapper-${index}`;
  wrapper.classList.add("image-wrapper", "img-enter");

  // Asignar clase de posición
  if (data.position === "left") wrapper.classList.add("pos-left");
  else if (data.position === "right") wrapper.classList.add("pos-right");
  else wrapper.classList.add("pos-center");

  const img = document.createElement("img");
  img.src = `images/${data.file}`;
  img.classList.add("visual-element", "wiggle-effect");

  // Si hay alguna clase extra para la imagen en sí en el futuro, va aquí

  wrapper.appendChild(img);
  visualsContainer.appendChild(wrapper);
}

function removeImageElement(index) {
  const wrapper = document.getElementById(`img-wrapper-${index}`);
  if (wrapper) {
    wrapper.classList.remove("img-enter");
    wrapper.classList.add("img-exit");

    // Esperar a que termine la animación para eliminar del DOM
    wrapper.addEventListener("animationend", () => {
      wrapper.remove();
    });
  }
}

function createVideoElement(data, index) {
  const img = document.createElement("img");
  img.src = `videos/${data.file}`;
  img.id = `vid-${index}`;
  img.classList.add("video-element", "video-fade-in");
  visualsContainer.appendChild(img);
}

// Bucle principal
function startSync() {
  requestAnimationFrame(checkTime);
}

function checkTime() {
  const currentTime = audioPlayer.currentTime;
  updateLyrics(currentTime);
  updateVisuals(currentTime);

  if (!audioPlayer.ended) {
    requestAnimationFrame(checkTime);
  }
}
