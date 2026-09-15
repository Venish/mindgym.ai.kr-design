/**
 * soundEffects.ts - Web Audio API 기반 전역 사운드 이펙트 유틸리티
 * 외부 오디오 파일 로딩 없이 0ms 즉각 반응하는 신디사이저 오디오 시스템
 */

export type ScreenSoundTheme =
  | "singingBowl" // 1. 싱잉볼 & 팅샤 명상벨 (기본값)
  | "analogWood" // 2. 아날로그 우드 & 스탠드 조명
  | "appleGlass" // 3. 애플 프리미엄 햅틱 & 글래스
  | "natureBreath"; // 4. 자연의 숨결 & 물방울

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private activeTheme: ScreenSoundTheme = "singingBowl"; // 1번 테마 (싱잉볼 & 팅샤 명상벨)

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return this.ctx;
    } catch (e) {
      return null;
    }
  }

  /**
   * 스크린 사운드 테마 설정 및 조회
   */
  public setTheme(theme: ScreenSoundTheme): void {
    this.activeTheme = theme;
  }

  public getTheme(): ScreenSoundTheme {
    return this.activeTheme;
  }

  /**
   * 1. [마음 스위치 - 딸] 키캡 누를 때: 접점 금속 스프링 찰칵음
   */
  public keyPressDown(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(2800, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.018);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.018);
    } catch (e) {}
  }

  /**
   * 2. [마음 스위치 - 깍] 키캡 뗄 때: 스프링 튕김 + 바삭한 고주파 스냅 릴리즈음
   */
  public keyReleaseUp(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      // 1) 맑은 키캡 틱 (1950Hz -> 1100Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1950, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.012);

      gain.gain.setValueAtTime(0.42, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.012);

      // 2) 바삭한 스냅 텍스처 노이즈
      const noiseBuffer = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * 0.015),
        ctx.sampleRate
      );
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] =
          (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.003));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3600, now);
      filter.Q.setValueAtTime(1.8, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.015);
    } catch (e) {}
  }

  // ==========================================
  // 3. [스크린 OFF / ON] 4대 테마 사운드 엔진
  // ==========================================

  /**
   * [통합 스크린 OFF] - 현재 설정된 테마에 따라 분기 실행
   */
  public screenOff(): void {
    switch (this.activeTheme) {
      case "singingBowl":
        this.playSingingBowlOff();
        break;
      case "analogWood":
        this.playAnalogWoodOff();
        break;
      case "appleGlass":
        this.playAppleGlassOff();
        break;
      case "natureBreath":
        this.playNatureBreathOff();
        break;
      default:
        this.playSingingBowlOff();
    }
  }

  /**
   * [통합 스크린 ON] - 현재 설정된 테마에 따라 분기 실행
   */
  public screenOn(): void {
    switch (this.activeTheme) {
      case "singingBowl":
        this.playSingingBowlOn();
        break;
      case "analogWood":
        this.playAnalogWoodOn();
        break;
      case "appleGlass":
        this.playAppleGlassOn();
        break;
      case "natureBreath":
        this.playNatureBreathOn();
        break;
      default:
        this.playSingingBowlOn();
    }
  }

  // --------------------------------------------------
  // [Option 1. 싱잉볼 & 팅샤 명상벨 (기본)]
  // --------------------------------------------------
  private playSingingBowlOff(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      // 432Hz 힐링 싱잉볼 저음 공명 (432Hz + 216Hz 서브)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 0.8);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.24, now + 0.03);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      [432, 216].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.96, now + 0.8);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(filter);
        osc.start(now);
        osc.stop(now + 0.85);
      });
    } catch (e) {}
  }

  private playSingingBowlOn(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      // 팅샤(Tingsha) 맑은 청동벨 차임 (C6 1046.5Hz + E6 1318.5Hz 화음)
      const tingshaNotes = [
        { freq: 1046.5, gain: 0.12, decay: 0.55 },
        { freq: 1318.5, gain: 0.08, decay: 0.5 },
        { freq: 2093.0, gain: 0.03, decay: 0.35 },
      ];

      tingshaNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(n.freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(n.gain, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.decay);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + n.decay);
      });
    } catch (e) {}
  }

  // --------------------------------------------------
  // [Option 2. 아날로그 우드 & 스탠드 조명]
  // --------------------------------------------------
  private playAnalogWoodOff(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 두툼한 우드 틱 + 로우 앰비언스
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.08);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  private playAnalogWoodOn(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 은은한 스탠드 전구 웜업 팝 (440Hz -> 520Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.06);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // --------------------------------------------------
  // [Option 3. 애플 프리미엄 햅틱 & 글래스]
  // --------------------------------------------------
  private playAppleGlassOff(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 서브 서프레션 툭(Thud)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.04);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  private playAppleGlassOn(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 크리스탈 글래스 틱(Tink)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1760, now); // A6
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  // --------------------------------------------------
  // [Option 4. 자연의 숨결 & 물방울]
  // --------------------------------------------------
  private playNatureBreathOff(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 깊은 숨을 내쉬는 윈드 스위시 (Exhale)
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.35), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / buffer.length);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);
      filter.Q.setValueAtTime(1.2, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(now);
      source.stop(now + 0.35);
    } catch (e) {}
  }

  private playNatureBreathOn(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // 맑은 물방울 퐁(Drop) (1300Hz -> 650Hz 피치 벤드)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(1350, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.1);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  /**
   * 5. [공통 부드러운 탭]
   */
  public softTap(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }
}

export const soundEffects = new SoundEffectsManager();
