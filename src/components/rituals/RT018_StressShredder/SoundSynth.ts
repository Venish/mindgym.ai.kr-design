/**
 * SoundSynth.ts - Pure Web Audio API Procedural DSP Synthesizer
 * 종이 급지음, 파쇄 브라운 노이즈 및 432Hz/OM 힐링 완결 톤 실시간 음향 합성
 */

export class SoundSynth {
  private ctx: AudioContext | null = null;
  private shredBufferNode: AudioBufferSourceNode | null = null;
  private shredGainNode: GainNode | null = null;
  public isShreddingPlaying = false;

  public initCtx(): void {
    if (typeof window === "undefined") return;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public playPaperFeedSound(): void {
    this.initCtx();
    if (!this.ctx) return;

    const duration = 0.3;
    const sampleRate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    let lastSample = 0;
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const env = Math.sin((i / data.length) * Math.PI);
      const white = (Math.random() * 2 - 1) * 0.06 * env;
      lastSample = lastSample + 0.1 * (white - lastSample);
      const warmSub = Math.sin(2 * Math.PI * 64 * t) * 0.12 * env;
      data[i] = Math.max(-0.85, Math.min(0.85, (lastSample + warmSub) * 0.6));
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.5;
    src.connect(gain);
    gain.connect(this.ctx.destination);
    src.start();
  }

  public playPrintFeedSound(): void {
    this.playPaperFeedSound();
  }

  public startShreddingSound(): void {
    this.initCtx();
    if (!this.ctx || this.isShreddingPlaying) return;

    const duration = 2.0;
    const sampleRate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    let lastSample = 0;

    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      const brownNoise = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;

      lastSample = lastSample + 0.08 * (brownNoise * 0.08 - lastSample);
      const t = i / sampleRate;
      const earthHum = Math.sin(2 * Math.PI * 54 * t) * 0.14;
      const softWoodRumble = Math.sin(2 * Math.PI * 72 * t) * 0.08;

      const mixed = lastSample * 0.65 + earthHum * 0.22 + softWoodRumble * 0.13;
      data[i] = Math.max(-0.85, Math.min(0.85, mixed * 0.7));
    }

    this.shredBufferNode = this.ctx.createBufferSource();
    this.shredBufferNode.buffer = buffer;
    this.shredBufferNode.loop = true;

    this.shredGainNode = this.ctx.createGain();
    this.shredGainNode.gain.setValueAtTime(0.58, this.ctx.currentTime);

    this.shredBufferNode.connect(this.shredGainNode);
    this.shredGainNode.connect(this.ctx.destination);

    this.shredBufferNode.start();
    this.isShreddingPlaying = true;
  }

  public stopShreddingSound(immediately = false): void {
    this.isShreddingPlaying = false;
    if (this.shredGainNode && this.ctx) {
      try {
        if (immediately) {
          this.shredGainNode.gain.setValueAtTime(0.00001, this.ctx.currentTime);
          if (this.shredBufferNode) {
            this.shredBufferNode.stop();
            this.shredBufferNode.disconnect();
            this.shredBufferNode = null;
          }
          return;
        }

        this.shredGainNode.gain.exponentialRampToValueAtTime(
          0.0001,
          this.ctx.currentTime + 0.15
        );
        setTimeout(() => {
          if (this.shredBufferNode) {
            try {
              this.shredBufferNode.stop();
              this.shredBufferNode.disconnect();
            } catch {}
            this.shredBufferNode = null;
          }
        }, 160);
      } catch {
        if (this.shredBufferNode) {
          try {
            this.shredBufferNode.stop();
          } catch {}
          this.shredBufferNode = null;
        }
      }
    }
  }

  public stopAll(): void {
    this.stopShreddingSound(true);
  }

  public playCompleteSound(): void {
    this.initCtx();
    if (!this.ctx) return;

    const duration = 2.8;
    const sampleRate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    const freqOM = 136.1;
    const freqHealing = 432.0;

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-1.4 * t);

      const omTone = Math.sin(2 * Math.PI * freqOM * t) * 0.65;
      const healingTone = Math.sin(2 * Math.PI * freqHealing * t) * 0.25;
      const subWarmth = Math.sin(2 * Math.PI * (freqOM * 0.5) * t) * 0.15;

      const chime = (omTone + healingTone + subWarmth) * decay;
      data[i] = Math.max(-0.85, Math.min(0.85, chime * 0.7));
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.7;
    src.connect(gain);
    gain.connect(this.ctx.destination);
    src.start();
  }
}
