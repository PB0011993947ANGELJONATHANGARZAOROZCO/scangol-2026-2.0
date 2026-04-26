// Componentes A-Frame
AFRAME.registerComponent('auto-rotate', {
  schema: {
    enabled: { type: 'boolean', default: false },
    speed: { type: 'number', default: 0.025 }
  },
  tick: function () {
    if (!this.data.enabled) { return; }
    this.el.object3D.rotation.y += this.data.speed;
  }
});

// Componente Confeti
AFRAME.registerComponent('confetti', {
  schema: {
    colors: {type: 'array', default: ['#ff0055', '#00c6ff', '#fbbf24', '#2ecc71', '#9b59b6', '#ffffff']},
    count: {type: 'number', default: 80} // Cantidad de papelitos
  },
  init: function () {
    this.particles = [];
    for (let i = 0; i < this.data.count; i++) {
      let p = document.createElement('a-plane');
      let c = this.data.colors[Math.floor(Math.random() * this.data.colors.length)];
      p.setAttribute('color', c);
      p.setAttribute('width', 0.08);
      p.setAttribute('height', 0.08);
      p.setAttribute('material', 'side: double; transparent: true; opacity: 0.9');

      // Posiciones aleatorias detrás del modelo (Eje Z negativo)
      let x = (Math.random() - 0.5) * 4;
      let y = Math.random() * 3 + 1;
      let z = -Math.random() * 2 - 0.5; 
      
      p.setAttribute('position', `${x} ${y} ${z}`);
      this.el.appendChild(p);
      
      this.particles.push({
        el: p, x: x, y: y, z: z,
        vY: -Math.random() * 0.04 - 0.02, // Velocidad de caída
        vX: (Math.random() - 0.5) * 0.02,
        rX: Math.random() * 10,
        rY: Math.random() * 10,
        rotX: 0, rotY: 0
      });
    }
  },
  tick: function () {
    this.particles.forEach(p => {
      p.y += p.vY; p.x += p.vX; p.rotX += p.rX; p.rotY += p.rY;
      // Si el confeti cae muy abajo, que vuelva a aparecer arriba
      if (p.y < -1.5) {
        p.y = 3 + Math.random(); p.x = (Math.random() - 0.5) * 4;
      }
      p.el.setAttribute('position', `${p.x} ${p.y} ${p.z}`);
      p.el.setAttribute('rotation', `${p.rotX} ${p.rotY} 0`);
    });
  }
});
