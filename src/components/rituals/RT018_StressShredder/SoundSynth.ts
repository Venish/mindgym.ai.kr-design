/**
 * SoundSynth.ts - Real Audio Sample & Multi-Theme ASMR Engine
 * 5가지 세단기 음원 테마 선택, 프리로드, 실시간 속도(playbackRate) 및 프리뷰 재생 지원
 */

export type ShredSoundTheme =
  | "soft_asmr"
  | "heavy_industrial"
  | "gentle_crunch"
  | "crisp_office"
  | "fast_compact";

export interface SoundThemeInfo {
  id: ShredSoundTheme;
  label: string;
  icon: string;
  desc: string;
}

export const SOUND_THEMES: SoundThemeInfo[] = [
  {
    id: "soft_asmr",
    label: "소프트 ASMR",
    icon: "🌿",
    desc: "저자극 서걱서걱 힐링 톤",
  },
  {
    id: "heavy_industrial",
    label: "묵직한 파쇄기",
    icon: "🏭",
    desc: "강력하고 깊은 모터 토크감",
  },
  {
    id: "gentle_crunch",
    label: "종이 크런치",
    icon: "📄",
    desc: "모터음 없는 순수 바스락 질감",
  },
  {
    id: "crisp_office",
    label: "오피스 세단기",
    icon: "🏢",
    desc: "깔끔하고 정돈된 현대식 톤",
  },
  {
    id: "fast_compact",
    label: "콤팩트 미니",
    icon: "⚡",
    desc: "빠르고 경쾌한 미니 세단기",
  },
];

export class SoundSynth {
  private ctx: AudioContext | null = null;
  private shredBufferNode: AudioBufferSourceNode | null = null;
  private shredGainNode: GainNode | null = null;
  public isShreddingPlaying = false;

  // Selected Theme (Default: fast_compact)
  private currentTheme: ShredSoundTheme = "fast_compact";

  // Preloaded Audio Buffers per Theme
  private themeBuffers: Map<ShredSoundTheme, AudioBuffer> = new Map();
  private paperFeedBuffer: AudioBuffer | null = null;
  private shredCompleteBuffer: AudioBuffer | null = null;
  private isLoaded = false;

  // Preview Node
  private previewSourceNode: AudioBufferSourceNode | null = null;
  private previewGainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initCtx();
      this.preloadAudioBuffers();
    }
  }

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

  /**
   * 5종 사운드 테마 및 효과음 사전 버퍼 캐싱
   */
  public async preloadAudioBuffers(): Promise<void> {
    if (this.isLoaded || typeof window === "undefined") return;
    this.initCtx();
    if (!this.ctx) return;

    const loadBuffer = async (url: string): Promise<AudioBuffer | null> => {
      try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const arrayBuffer = await response.arrayBuffer();
        return await this.ctx!.decodeAudioData(arrayBuffer);
      } catch (err) {
        console.warn(`[SoundSynth] Failed to load audio sample ${url}:`, err);
        return null;
      }
    };

    try {
      const v = "5";
      const [soft, heavy, crunch, office, compact, feed, complete] = await Promise.all([
        loadBuffer(`/rituals/RT018_StressShredder/sounds/shred_soft_asmr.wav?v=${v}`),
        loadBuffer(`/rituals/RT018_StressShredder/sounds/shred_heavy_industrial.wav?v=${v}`),
        loadBuffer(`/rituals/RT018_StressShredder/sounds/shred_gentle_crunch.wav?v=${v}`),
        loadBuffer(`/rituals/RT018_StressShredder/sounds/shred_crisp_office.wav?v=${v}`),
        loadBuffer(`/rituals/RT018_StressShredder/sounds/shred_fast_compact.wav?v=${v}`),
        loadBuffer(`/rituals/RT018_StressShredder/sounds/paper_feed.wav?v=${v}`),
        loadBuffer(`/rituals/RT018_StressShredder/sounds/shred_complete.wav?v=${v}`),
      ]);

      if (soft) this.themeBuffers.set("soft_asmr", soft);
      if (heavy) this.themeBuffers.set("heavy_industrial", heavy);
      if (crunch) this.themeBuffers.set("gentle_crunch", crunch);
      if (office) this.themeBuffers.set("crisp_office", office);
      if (compact) this.themeBuffers.set("fast_compact", compact);

      if (feed) this.paperFeedBuffer = feed;
      if (complete) this.shredCompleteBuffer = complete;
      this.isLoaded = true;
    } catch (e) {
      console.warn("[SoundSynth] Audio preload error:", e);
    }
  }

  /**
   * 사운드 테마 변경
   */
  public setTheme(theme: ShredSoundTheme): void {
    this.currentTheme = theme;
  }

  public getTheme(): ShredSoundTheme {
    return this.currentTheme;
  }

  /**
   * 사운드 선택 시 1.0초 프리뷰 짧게 미리듣기
   */
  public previewSound(theme: ShredSoundTheme): void {
    this.initCtx();
    if (!this.ctx) return;

    this.setTheme(theme);
    this.stopPreview();

    const buffer = this.themeBuffers.get(theme);
    if (!buffer) {
      this.playPaperFeedSound();
      return;
    }

    try {
      this.previewSourceNode = this.ctx.createBufferSource();
      this.previewSourceNode.buffer = buffer;
      this.previewGainNode = this.ctx.createGain();

      this.previewGainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.previewGainNode.gain.exponentialRampToValueAtTime(0.7, this.ctx.currentTime + 0.05);
      this.previewGainNode.gain.setValueAtTime(0.7, this.ctx.currentTime + 0.7);
      this.previewGainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.95);

      this.previewSourceNode.connect(this.previewGainNode);
      this.previewGainNode.connect(this.ctx.destination);

      this.previewSourceNode.start(0, 0.2, 0.95);
    } catch (err) {
      console.warn("[SoundSynth] Preview error:", err);
    }
  }

  public stopPreview(): void {
    if (this.previewSourceNode) {
      try {
        this.previewSourceNode.stop();
        this.previewSourceNode.disconnect();
      } catch {}
      this.previewSourceNode = null;
    }
  }

  /**
   * 종이 투입 마찰 사운드
   */
  public playPaperFeedSound(): void {
    this.initCtx();
    if (!this.ctx) return;

    if (this.paperFeedBuffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.paperFeedBuffer;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.75;
      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();
      return;
    }
  }

  public playPrintFeedSound(): void {
    this.playPaperFeedSound();
  }

  /**
   * 선택된 테마의 파쇄 사운드 루프 재생 (속도/피치 가변 연동)
   */
  public startShreddingSound(speed: number = 1.0): void {
    this.initCtx();
    if (!this.ctx || this.isShreddingPlaying) return;

    this.stopPreview();
    const speedNorm = Math.max(0.7, Math.min(1.5, speed));
    const activeBuffer =
      this.themeBuffers.get(this.currentTheme) ||
      this.themeBuffers.get("soft_asmr");

    if (activeBuffer) {
      this.shredBufferNode = this.ctx.createBufferSource();
      this.shredBufferNode.buffer = activeBuffer;
      this.shredBufferNode.loop = true;
      this.shredBufferNode.playbackRate.setValueAtTime(speedNorm, this.ctx.currentTime);

      this.shredGainNode = this.ctx.createGain();
      this.shredGainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.shredGainNode.gain.exponentialRampToValueAtTime(0.75, this.ctx.currentTime + 0.08);

      this.shredBufferNode.connect(this.shredGainNode);
      this.shredGainNode.connect(this.ctx.destination);

      this.shredBufferNode.start();
      this.isShreddingPlaying = true;
      return;
    }
  }

  /**
   * 실시간 파쇄 속도 조절 (슬라이더 피치 시프트)
   */
  public setSpeed(speed: number): void {
    if (this.shredBufferNode && this.ctx && this.isShreddingPlaying) {
      const speedNorm = Math.max(0.7, Math.min(1.5, speed));
      this.shredBufferNode.playbackRate.setValueAtTime(speedNorm, this.ctx.currentTime);
    }
  }

  /**
   * 파쇄 사운드 페이드아웃 정지
   */
  public stopShreddingSound(immediately = false): void {
    this.isShreddingPlaying = false;
    this.stopPreview();

    if (this.shredGainNode && this.ctx) {
      try {
        if (immediately) {
          this.shredGainNode.gain.setValueAtTime(0.00001, this.ctx.currentTime);
          if (this.shredBufferNode) {
            try {
              this.shredBufferNode.stop();
              this.shredBufferNode.disconnect();
            } catch {}
            this.shredBufferNode = null;
          }
          return;
        }

        this.shredGainNode.gain.exponentialRampToValueAtTime(
          0.0001,
          this.ctx.currentTime + 0.12
        );
        setTimeout(() => {
          if (this.shredBufferNode) {
            try {
              this.shredBufferNode.stop();
              this.shredBufferNode.disconnect();
            } catch {}
            this.shredBufferNode = null;
          }
        }, 130);
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
    this.stopPreview();
  }

  /**
   * 파쇄 완결 힐링 사운드
   */
  public playCompleteSound(): void {
    this.initCtx();
    if (!this.ctx) return;

    if (this.shredCompleteBuffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.shredCompleteBuffer;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.75;
      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();
    }
  }
}
