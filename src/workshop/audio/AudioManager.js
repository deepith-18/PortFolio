/* ============================================================
   AudioManager — Calm Ambient & Spatial Audio Engine
   Defaults to MUTED for peaceful browsing.
   When enabled, plays a soothing warm ambient synth pad.
   No jarring random beeps or abrupt screeching.
   ============================================================ */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = true; // Default MUTED so user isn't startled
    this.currentZone = null;
    this._padOscs = [];
    this._filterNode = null;
    this._listeners = new Set();
  }

  addListener(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  _notify() {
    this._listeners.forEach(fn => {
      try { fn(this.isMuted); } catch {}
    });
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 0.45;
      this.masterGain.connect(this.ctx.destination);

      // Setup gentle ambient pad
      this._buildAmbientPad();
    } catch (e) {
      console.warn('Audio Context init failed', e);
    }
  }

  _buildAmbientPad() {
    if (!this.ctx) return;

    // Gentle low-pass filter for warm tone
    this._filterNode = this.ctx.createBiquadFilter();
    this._filterNode.type = 'lowpass';
    this._filterNode.frequency.value = 380;
    this._filterNode.Q.value = 1.0;
    this._filterNode.connect(this.masterGain);

    // Warm chord notes (A minor / D suspended harmonic pad)
    const chordFrequencies = [55, 110, 164.81, 220, 329.63];

    chordFrequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.value = freq;

      // Subtle detune for natural warmth
      osc.detune.value = (idx % 2 === 0 ? 3 : -3) * (idx + 1);

      // Low volume per voice
      gain.gain.value = idx === 0 ? 0.04 : 0.025;

      osc.connect(gain);
      gain.connect(this._filterNode);
      try {
        osc.start();
        this._padOscs.push({ osc, gain });
      } catch {}
    });
  }

  setZone(zoneId) {
    this.currentZone = zoneId;
    if (!this.ctx || !this._filterNode) return;

    // Gently adjust filter frequency based on station zone for subtle atmosphere shift
    const now = this.ctx.currentTime;
    const targetFreq = {
      null: 350,
      projects: 480,
      skills: 420,
      opensource: 500,
      certifications: 380
    }[zoneId] || 380;

    try {
      this._filterNode.frequency.setTargetAtTime(targetFreq, now, 1.5);
    } catch {}
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.4, now, 0.25);
    }
    this._notify();
  }

  toggleMute() {
    if (!this.ctx) {
      this.init();
    }
    this.resume();
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft interaction chime (healing / calm bell)
  playInteraction(type = 'open') {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'open' ? 523.25 : 392.00, now); // C5 or G4
      if (type === 'open') {
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
      }

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.55);
    } catch {}
  }

  // Soft subtle footstep (very quiet, non-distracting)
  playFootstep(surface = 'wood') {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.06);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  playProximityWarning() {
    // Silent
  }
}

export const audioManager = new AudioManager();
