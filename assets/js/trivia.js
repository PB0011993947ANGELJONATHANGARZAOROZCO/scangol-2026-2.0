// Lógica Trivia
window.triviaIndex = 0;
window.triviaScore = 0;
window.triviaQuestions = [];

window.loadTriviaQuestion = function() {
  const triviaBox = document.getElementById('triviaBox');
  const triviaQuestion = document.getElementById('triviaQuestion');
  const triviaResult = document.getElementById('triviaResult');
  
  // Fin del juego: Mostrar Puntuación
  if (window.triviaIndex >= window.triviaQuestions.length) { 
    triviaQuestion.innerHTML = `¡Juego Terminado!<br><span style="font-size:0.8em; color:#ccc">Tu Puntuación Final</span>`;
    const optionsDiv = document.getElementById('triviaOptions');
    optionsDiv.innerHTML = `
      <div style="width:100%; text-align:center;">
          <h1 style="font-size:3rem; margin:10px 0; background:linear-gradient(135deg, #00c6ff, #0072ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${window.triviaScore} / ${window.triviaQuestions.length}</h1>
          <button onclick="window.closeTriviaOrVideo()" class="action-btn" style="margin:20px auto; display:inline-block;">Cerrar</button>
      </div>
    `;
    triviaResult.textContent = '';
    return; 
  }

  const questionData = window.triviaQuestions[window.triviaIndex];
  triviaQuestion.textContent = questionData.question;
  const optionsDiv = document.getElementById('triviaOptions');
  optionsDiv.innerHTML = '';
  triviaResult.textContent = '';
  triviaResult.className = '';
  questionData.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => window.checkAnswer(option, questionData.answer);
    optionsDiv.appendChild(btn);
  });
};

window.checkAnswer = function(selected, correct) {
  const triviaResult = document.getElementById('triviaResult');
  const btns = document.querySelectorAll('#triviaOptions button');
  btns.forEach(btn => btn.disabled = true); // Evitar doble click

  if (selected === correct) {
    triviaResult.textContent = '✅ ¡Correcto!';
    triviaResult.className = 'correct';
    window.triviaScore++;
  } else {
    triviaResult.textContent = `❌ Incorrecto. La respuesta era: ${correct}`;
    triviaResult.className = 'incorrect';
  }

  window.triviaIndex++;
  setTimeout(window.loadTriviaQuestion, 2000);
};

window.showTrivia = function() {
  if (window.hideAll) window.hideAll();// ==============================
// DATOS DE TRIVIA (50 preguntas)
// ==============================
const triviaData = [

  // ALEMANIA
  { question: "¿Cuántos mundiales ha ganado Alemania?", options: ["2", "3", "4", "5"], answer: "4" },
  { question: "¿En qué año ganó Alemania su último mundial?", options: ["2010", "2014", "2018", "2006"], answer: "2014" },
  { question: "¿Qué jugador es histórico de Alemania?", options: ["Messi", "Klose", "Neymar", "Suárez"], answer: "Klose" },
  { question: "¿Color principal del uniforme alemán?", options: ["Rojo", "Negro", "Azul", "Verde"], answer: "Negro" },
  { question: "¿A quién venció en 2014 Alemania?", options: ["Argentina", "Brasil", "España", "Francia"], answer: "Argentina" },

  // ARGENTINA
  { question: "¿Cuántos mundiales ha ganado Argentina?", options: ["1", "2", "3", "4"], answer: "3" },
  { question: "¿Jugador más icónico de Argentina?", options: ["Cristiano", "Messi", "Mbappé", "Kane"], answer: "Messi" },
  { question: "¿Año del mundial ganado por Argentina?", options: ["2020", "2021", "2022", "2023"], answer: "2022" },
  { question: "¿Contra quién jugó la final 2022 Argentina?", options: ["Brasil", "Francia", "Alemania", "España"], answer: "Francia" },
  { question: "Colores de Argentina?", options: ["Rojo", "Azul y blanco", "Verde", "Negro"], answer: "Azul y blanco" },

  // AUSTRALIA
  { question: "¿Confederación de Australia?", options: ["UEFA", "CONMEBOL", "AFC", "CAF"], answer: "AFC" },
  { question: "¿Apodo del equipo australiano?", options: ["Socceroos", "All Blacks", "Canucks", "Samba"], answer: "Socceroos" },
  { question: "¿Color principal de Australia?", options: ["Azul", "Amarillo", "Rojo", "Negro"], answer: "Amarillo" },
  { question: "¿Mejor resultado en mundial por Australia?", options: ["Octavos", "Final", "Semifinal", "Campeón"], answer: "Octavos" },
  { question: "¿En qué continente está Australia?", options: ["Europa", "Oceanía", "Asia", "África"], answer: "Oceanía" },

  // BRASIL
  { question: "¿Cuántos mundiales ha ganado Brasil?", options: ["3", "4", "5", "6"], answer: "5" },
  { question: "¿Jugador legendario de Brasil?", options: ["Pelé", "Messi", "Zidane", "Modric"], answer: "Pelé" },
  { question: "Color principal de Brasil?", options: ["Rojo", "Azul", "Amarillo", "Negro"], answer: "Amarillo" },
  { question: "¿Apodo de Brasil?", options: ["La Roja", "Canarinha", "Bleus", "Three Lions"], answer: "Canarinha" },
  { question: "¿Último mundial ganado por Brasil?", options: ["2002", "2006", "2010", "2014"], answer: "2002" },

  // CANADA
  { question: "¿Confederación canadiense?", options: ["UEFA", "CONCACAF", "AFC", "CAF"], answer: "CONCACAF" },
  { question: "¿Color principal de Canadá?", options: ["Rojo", "Azul", "Verde", "Negro"], answer: "Rojo" },
  { question: "¿Ha ganado un mundial Canadá?", options: ["Sí", "No"], answer: "No" },
  { question: "¿Región canadiense?", options: ["Europa", "América", "Asia", "África"], answer: "América" },
  { question: "¿Apodo de Canadá?", options: ["Canucks", "Samba", "Bleus", "Roja"], answer: "Canucks" },

  // COLOMBIA
  { question: "¿Jugador histórico colombiano?", options: ["James", "Messi", "Neymar", "Mbappé"], answer: "James" },
  { question: "Color principal de Colombia?", options: ["Amarillo", "Azul", "Rojo", "Verde"], answer: "Amarillo" },
  { question: "¿Mejor resultado de Colombia?", options: ["Cuartos", "Final", "Semifinal", "Campeón"], answer: "Cuartos" },
  { question: "¿Confederación colombiana?", options: ["UEFA", "CONMEBOL", "AFC", "CAF"], answer: "CONMEBOL" },
  { question: "¿En qué continente está Colombia?", options: ["Europa", "América", "Asia", "África"], answer: "América" },

  // ECUADOR
  { question: "¿Confederación ecuatoriana?", options: ["UEFA", "CONMEBOL", "AFC", "CAF"], answer: "CONMEBOL" },
  { question: "Color principal de Ecuador?", options: ["Amarillo", "Rojo", "Azul", "Negro"], answer: "Amarillo" },
  { question: "¿Ha ganado un mundial Ecuador?", options: ["Sí", "No"], answer: "No" },
  { question: "¿Continente de Ecuador?", options: ["Europa", "América", "Asia", "África"], answer: "América" },
  { question: "¿Mejor resultado de Ecuador?", options: ["Octavos", "Final", "Semifinal", "Campeón"], answer: "Octavos" },

  // ESPAÑA
  { question: "¿Cuántos mundiales ha ganado España?", options: ["1", "2", "3", "4"], answer: "1" },
  { question: "¿Año del mundial ganado por España?", options: ["2006", "2010", "2014", "2018"], answer: "2010" },
  { question: "¿Apodo de España?", options: ["La Roja", "Canarinha", "Bleus", "Three Lions"], answer: "La Roja" },
  { question: "Color principal de España?", options: ["Rojo", "Azul", "Verde", "Negro"], answer: "Rojo" },
  { question: "¿Confederación de España?", options: ["UEFA", "CONMEBOL", "AFC", "CAF"], answer: "UEFA" },

  // FRANCIA
  { question: "¿Cuántos mundiales ha ganado Francia?", options: ["1", "2", "3", "4"], answer: "2" },
  { question: "¿Jugador famoso de Francia?", options: ["Mbappé", "Messi", "Neymar", "Kane"], answer: "Mbappé" },
  { question: "Color principal de Francia?", options: ["Azul", "Rojo", "Verde", "Negro"], answer: "Azul" },
  { question: "¿Apodo de Francia?", options: ["Bleus", "Roja", "Canarinha", "Socceroos"], answer: "Bleus" },
  { question: "¿Último mundial ganado por Francia?", options: ["2014", "2018", "2022", "2010"], answer: "2018" },

  // MEXICO
  { question: "¿Confederación mexicana?", options: ["UEFA", "CONCACAF", "AFC", "CAF"], answer: "CONCACAF" },
  { question: "Color principal de México?", options: ["Verde", "Rojo", "Azul", "Negro"], answer: "Verde" },
  { question: "¿Apodo de México?", options: ["Tri", "Bleus", "Roja", "Samba"], answer: "Tri" },
  { question: "¿Mejor resultado de México?", options: ["Octavos", "Final", "Semifinal", "Campeón"], answer: "Octavos" },
  { question: "¿México ha sido anfitrión?", options: ["Sí", "No"], answer: "Sí" }

];

// ==============================
// LÓGICA
// ==============================
window.triviaIndex = 0;
window.triviaScore = 0;
window.triviaQuestions = [];

window.loadTriviaQuestion = function() {
  const triviaQuestion = document.getElementById('triviaQuestion');
  const triviaResult = document.getElementById('triviaResult');
  const optionsDiv = document.getElementById('triviaOptions');

  if (!triviaQuestion || !optionsDiv) return;

  // FIN
  if (window.triviaIndex >= window.triviaQuestions.length) {
    triviaQuestion.innerHTML = `¡Juego Terminado!<br><span style="font-size:0.8em;">Puntuación final</span>`;
    optionsDiv.innerHTML = `
      <div style="text-align:center;">
        <h1>${window.triviaScore} / ${window.triviaQuestions.length}</h1>
        <button onclick="closeTriviaOrVideo()">Cerrar</button>
      </div>
    `;
    triviaResult.textContent = '';
    return;
  }

  const q = window.triviaQuestions[window.triviaIndex];
  triviaQuestion.textContent = q.question;
  optionsDiv.innerHTML = '';
  triviaResult.textContent = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => window.checkAnswer(opt, q.answer);
    optionsDiv.appendChild(btn);
  });
};

window.checkAnswer = function(selected, correct) {
  const triviaResult = document.getElementById('triviaResult');
  document.querySelectorAll('#triviaOptions button').forEach(b => b.disabled = true);

  if (selected === correct) {
    triviaResult.textContent = "✅ Correcto";
    window.triviaScore++;
  } else {
    triviaResult.textContent = `❌ Incorrecto. Era: ${correct}`;
  }

  window.triviaIndex++;
  setTimeout(window.loadTriviaQuestion, 1500);
};

window.showTrivia = function() {

  if (typeof window.hideAll === "function") window.hideAll();

  window.triviaIndex = 0;
  window.triviaScore = 0;

  window.triviaQuestions = [...triviaData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  document.getElementById('triviaBox').style.display = 'block';

  window.loadTriviaQuestion();
};

// 🔥 ESTA ERA LA FUNCIÓN QUE FALTABA
window.closeTriviaOrVideo = function() {
  const box = document.getElementById('triviaBox');
  if (box) box.style.display = 'none';
};
  window.triviaIndex = 0;
  window.triviaScore = 0;
  window.triviaQuestions = [...triviaData].sort(() => 0.5 - Math.random()).slice(0,5);
  window.loadTriviaQuestion();
  const triviaBox = document.getElementById('triviaBox');
  triviaBox.style.display = 'block';
};
