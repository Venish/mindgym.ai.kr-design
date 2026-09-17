/**
 * Web Audio API Synthesizer (Zero External Dependencies)
 * RT073 시선맑음 전용 사운드 신디사이저
 */
export class SoundSynth {
  private audioCtx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    this.enabled = true;
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
    }
    return !this.enabled;
  }

  public init() {
    if (!this.enabled) return;
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch (e) {
          console.warn("AudioContext init error", e);
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
  }

  public playTone(freq: number, type: OscillatorType, duration: number, gainValue = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {});
      }
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gainNode.gain.setValueAtTime(gainValue, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Ignore audio errors gracefully
    }
  }

  public playCorrect() {
    if (!this.enabled) return;
    this.playTone(523.25, "sine", 0.08, 0.16);
    setTimeout(() => this.playTone(659.25, "sine", 0.12, 0.18), 70);
    setTimeout(() => this.playTone(783.99, "sine", 0.18, 0.2), 140);
  }

  public playMiss() {
    if (!this.enabled) return;
    this.playTone(240, "sawtooth", 0.12, 0.14);
    setTimeout(() => this.playTone(170, "sawtooth", 0.22, 0.15), 90);
  }

  public playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {});
      }
      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(750, t);
      osc.frequency.exponentialRampToValueAtTime(350, t + 0.045);

      gainNode.gain.setValueAtTime(0.18, t);
      gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + 0.045);
    } catch {
      // Ignore audio errors gracefully
    }
  }

  public playStart() {
    if (!this.enabled) return;
    this.playTone(440, "sine", 0.09, 0.15);
    setTimeout(() => this.playTone(880, "sine", 0.18, 0.18), 100);
  }

  public close() {
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch {}
      this.audioCtx = null;
    }
  }
}
