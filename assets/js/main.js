// UI Principal
document.addEventListener('DOMContentLoaded', () => {
  window.currentCountry = null;
  window.activeTargetEntity = null;

  const startBtn = document.getElementById('startBtn');
  const backBtn = document.getElementById('backBtn');
  const intro = document.getElementById('intro');
  const arContainer = document.getElementById('ar-container');
  const btn4 = document.getElementById('btn4');

  if (backBtn) backBtn.addEventListener('click', () => { window.location.href = 'index.html'; });

  window.resetButtons = function() {
    const mainButtons = [btn4];
    mainButtons.forEach(btn => { if (btn) btn.style.display = 'inline-block'; });
  };

  window.hideAll = function() {
    ['statsBox', 'videoBox', 'triviaBox', 'infoBox'].forEach(id => {
      const el = document.getElementById(id); if (el) el.style.display = 'none';
    });
    const player = document.getElementById('videoPlayer'); if (player) { player.pause(); player.currentTime = 0; }
  };

  window.closeTriviaOrVideo = function() {
    const triviaBox = document.getElementById('triviaBox'); if (triviaBox) triviaBox.style.display = 'none';
    const videoBox = document.getElementById('videoBox'); if (videoBox) videoBox.style.display = 'none';
  };

  window.closeStats = function() {
    const statsBox = document.getElementById('statsBox'); if (statsBox) statsBox.style.display = 'none';
  };

  window.unlockAR = function() {
    window.isARLocked = false;
    const buttonsPanel = document.getElementById('buttons-panel');
    if (buttonsPanel) buttonsPanel.style.display = 'none';
    const infoBox = document.getElementById('infoBox'); 
    if (infoBox) infoBox.style.display = 'none';
    window.currentCountry = null;
    window.activeTargetEntity = null;
  };

  window.showInfo = function(country) {
    if (!countryData[country]) return;
    const infoBox = document.getElementById('infoBox');
    if (!infoBox) return;
    infoBox.style.display = 'block';
    const countryName = countryData[country].name;
    infoBox.innerHTML = `
      <button class="close-btn" onclick="unlockAR()" title="Cerrar y Escanear otro">
        <i class="fas fa-times"></i>
      </button>
      <h3>Datos: ${countryName}</h3>${countryData[country].info}
    `;
    const triviaBox = document.getElementById('triviaBox'); if (triviaBox) triviaBox.style.display = 'none';
  };

  if (btn4) btn4.addEventListener('click', () => { if (window.activeTargetEntity) window.animaModel(window.activeTargetEntity); });

  if (startBtn) startBtn.addEventListener('click', () => {
    // Modo AR
    document.body.classList.add('ar-active');
    document.documentElement.classList.add('ar-active');

    if (intro) intro.style.display = 'none';
    const header = document.querySelector('header'); if (header) header.style.display = 'none';
    const footer = document.querySelector('footer'); if (footer) footer.style.display = 'none';
    const arHeader = document.getElementById('ar-header'); if (arHeader) arHeader.style.display = 'flex';
    const arFooter = document.getElementById('ar-footer'); if (arFooter) arFooter.style.display = 'block';
    
    // Controles cámara
    const camControls = document.getElementById('camera-controls');
    if (camControls) camControls.style.display = 'block';

    const player = document.getElementById('videoPlayer'); if (player) player.pause();

    // Iniciar escena
    window.createARScene();
    
    // Init lógica
    if (window.initARLogic) window.initARLogic();
    if (window.resetButtons) window.resetButtons();

    // Resize fix
    const triggerResize = () => { window.dispatchEvent(new Event('resize')); };
    setTimeout(triggerResize, 300);
    setTimeout(triggerResize, 1000);
  });

  // Register service worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  }

});
