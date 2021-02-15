

/**
 * @type {{osc: OscillatorNode; gain: GainNode; timing: number; }[]}
 */
const cylinders = [];

let crankshaftTimeout;

function startEngine() {
  const audioContext = new AudioContext();
  for (let i = 0; i < 4; i++) {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 80;
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    gain.gain.value = 0;
    osc.start();
    let timing = 0;
    if (i === 0) {
      timing = 180;
    } else if (i === 1) {
      timing = 270;
    } else if (i === 3) {
      timing = 450;
    } else if (i === 4) {
      timing = 720;
    }
    cylinders.push({
      osc, gain, timing
    });
  }

  // Crankshaft
  // 1000 RPM = 16.67 RPS = 
  // 720 degrees of rotation
  const rpm = 100;
  const rpmInterval = rpm / 60
  crankshaftTimeout = setInterval(() => {
    for (const cylinder of cylinders) {

      setTimeout(() => {
        cylinder.gain.gain.value = 1;
        // cylinder.gain.gain.linearRampToValueAtTime(0.0001, audioContext.currentTime + 15);
      }, cylinder.timing / 720 * rpmInterval);
    }

  }, 1000 / rpmInterval);
}

function playSine() {
  osc.start();
}