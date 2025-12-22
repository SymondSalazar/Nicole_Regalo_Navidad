// Datos de la letra sincronizados (Tiempos convertidos a segundos)
const lyricsData = [
  { start: 1.08, end: 5.15, text: "Qué bonitos tus ojitos," },
  {
    start: 5.16,
    end: 11.39,
    text: "como obsidianas en calma,<br>y tu nariz pronunciada,",
  },
  {
    start: 11.4,
    end: 17.11,
    text: "que pareciera tallada<br>con agua del río Grijalva,",
  },
  { start: 17.12, end: 21.27, text: "y qué bonito tu acento," },
  { start: 21.28, end: 25.35, text: "como canción de calandria," },
  {
    start: 25.36,
    end: 29.91,
    text: "qué lindo tu movimiento,<br>como canoa con el viento flotando.",
  },
  { start: 30.24, end: 34.43, text: "en el papaloapan," },
  { start: 34.44, end: 38.63, text: "ay morena morenita," },
  { start: 38.64, end: 43.27, text: "eres mi artesanía favorita," },
  { start: 43.28, end: 46.71, text: "mi razón, pues de son," },
  { start: 46.72, end: 50.51, text: "ay morena tu carita" },
  { start: 50.52, end: 55.47, text: "y esas trenzas como de una muñequita," },
  { start: 55.48, end: 59.91, text: "son un milagrito bajo el sol." },
  // Espacio instrumental largo manejado para que no se quede texto viejo
  {
    start: 73.72,
    end: 78.59,
    text: "y qué fresquita la sombra<br>que te dibuja el sombrero que preciosura",
  },
  { start: 78.6, end: 82.19, text: "el pigmento de barro" },
  { start: 82.2, end: 87.35, text: "y cobre contento que tiene tu cuerpo" },
  { start: 87.36, end: 91.15, text: "entero tú huipilito" },
  { start: 91.16, end: 98.07, text: "de flores atrae a las mariposas," },
  { start: 98.08, end: 100.27, text: "con bota larga o reboso," },
  {
    start: 100.28,
    end: 107.27,
    text: "pones al cielo celoso de tu silueta preciosa,",
  },
  { start: 107.28, end: 111.47, text: "ay morena morenita," },
  { start: 111.48, end: 116.07, text: "eres mi artesanía favorita," },
  { start: 116.08, end: 119.91, text: "mi razón pues de son." },
  { start: 120.24, end: 124.07, text: "ay morena tu carita y esas" },
  { start: 124.08, end: 128.75, text: "trenzas como de una muñequita," },
  { start: 128.76, end: 132.47, text: "son un milagrito bajo" },
  { start: 132.48, end: 147.71, text: "el sol," },
  { start: 147.72, end: 149.91, text: "morenita de barro" },
  {
    start: 150.08,
    end: 155.87,
    text: "Morenita de sol,<br>te planté un saguaro en mi corazón,",
  },
  {
    start: 155.88,
    end: 162.03,
    text: "morenita de barro, morenita de sol,<br>te planté un sabuaro,",
  },
  { start: 162.04, end: 167.75, text: "en mi corazón ay morena," },
  { start: 167.76, end: 171.99, text: "ay morena," },
  { start: 172.0, end: 179.91, text: "ay morena," },
  { start: 180.2, end: 185.51, text: "tu eres ese milagrito bajo" },
  { start: 185.52, end: 194.79, text: "el sol." },
];

const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const lyricsScreen = document.getElementById("lyrics-screen");
const audioPlayer = document.getElementById("audio-player");
const currentLineEl = document.getElementById("current-line");

startBtn.addEventListener("click", () => {
  // 1. Ocultar pantalla de bienvenida
  welcomeScreen.style.opacity = "0";

  setTimeout(() => {
    welcomeScreen.classList.add("hidden");
    lyricsScreen.classList.remove("hidden");

    // Pequeña pausa para que la transición sea suave
    setTimeout(() => {
      lyricsScreen.style.opacity = "1";
      audioPlayer.play();
      startSync();
    }, 500);
  }, 1000);
});

function startSync() {
  // Loop de animación para chequear el tiempo constantemente
  requestAnimationFrame(checkTime);
}

function checkTime() {
  const currentTime = audioPlayer.currentTime;

  // Buscar si hay alguna línea que corresponda al tiempo actual
  const currentLyric = lyricsData.find(
    (line) => currentTime >= line.start && currentTime <= line.end
  );

  if (currentLyric) {
    // Si el texto es diferente al que ya está, actualizamos
    if (currentLineEl.innerHTML !== currentLyric.text) {
      // Animación de salida (fade out)
      currentLineEl.classList.remove("visible-lyric");

      // Esperar un momento breve para cambiar el texto y hacer fade in
      setTimeout(() => {
        currentLineEl.innerHTML = currentLyric.text;
        currentLineEl.classList.add("visible-lyric");
      }, 100); // 100ms para el cambio
    }
  } else {
    // Si no hay letra en este momento (intro o instrumental), ocultamos el texto
    currentLineEl.classList.remove("visible-lyric");
  }

  // Continuar el loop
  requestAnimationFrame(checkTime);
}
