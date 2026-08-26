import { Quad } from "./types";

export class StripParticle {
  public quad: Quad;
  public offCanvas: HTMLCanvasElement;
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public rotation: number;
  public vRot: number;
  public opacity: number;
  public scale: number;
  public life: number;
  public maxLife: number;

  constructor(quad: Quad, offCanvas: HTMLCanvasElement, paperX: number, startY: number) {
    this.quad = quad;
    this.offCanvas = offCanvas;
    this.x = paperX + quad.sx + (Math.random() * 12 - 6);
    this.y = startY + (Math.random() * 8 - 4);

    this.vx = (Math.random() - 0.5) * 120;
    this.vy = 80 + Math.random() * 140;
    this.rotation = Math.random() * Math.PI * 2;
    this.vRot = (Math.random() - 0.5) * 8.0;
    this.opacity = 1.0;
    this.scale = 0.85 + Math.random() * 0.3;
    this.life = 0;
    this.maxLife = 2.2 + Math.random() * 1.2;
  }

  public update(dt: number): void {
    this.life += dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += 320 * dt; // Gravity
    this.vx *= 0.98; // Air resistance
    this.rotation += this.vRot * dt;

    if (this.life > this.maxLife - 0.6) {
      this.opacity = Math.max(0, (this.maxLife - this.life) / 0.6);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.opacity <= 0) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    ctx.globalAlpha = this.opacity;

    ctx.drawImage(
      this.offCanvas,
      this.quad.sx,
      this.quad.sy,
      this.quad.sw,
      this.quad.sh,
      -this.quad.sw / 2,
      -this.quad.sh / 2,
      this.quad.sw,
      this.quad.sh
    );

    ctx.restore();
  }
}

export class PaperCanvas {
  public width: number;
  public height: number;
  public offCanvas: HTMLCanvasElement | null = null;
  public ctx: CanvasRenderingContext2D | null = null;
  public quads: Quad[] = [];

  constructor(width = 290, height = 380) {
    this.width = width;
    this.height = height;

    if (typeof document !== "undefined") {
      this.offCanvas = document.createElement("canvas");
      this.offCanvas.width = width;
      this.offCanvas.height = height;
      this.ctx = this.offCanvas.getContext("2d");
    }
  }

  public rasterizeText(text: string): void {
    if (!this.ctx || !this.offCanvas) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Warm Ivory Cream Paper Background
    ctx.fillStyle = "#FFFDF8";
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Faint Stationery Ruling Lines
    ctx.strokeStyle = "rgba(234, 224, 206, 0.85)";
    ctx.lineWidth = 1.0;
    let startLineY = 46;
    while (startLineY < this.height - 20) {
      ctx.beginPath();
      ctx.moveTo(18, startLineY);
      ctx.lineTo(this.width - 18, startLineY);
      ctx.stroke();
      startLineY += 26;
    }

    // 3. Paper Outer Rim Border
    ctx.strokeStyle = "rgba(235, 227, 211, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(1, 1, this.width - 2, this.height - 2);

    // 4. Crisp Typography Wrap
    ctx.fillStyle = "#1A1F29";
    ctx.font =
      '500 16px "NanumSquareRound", "Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';

    const margin = 24;
    const printWidth = this.width - margin * 2;
    this.wrapText(
      ctx,
      text ||
        "오늘 마음속 깊은 곳을 답답하게 만들었던 불안이나 스트레스를 이곳에 적어보세요.",
      margin,
      margin + 20,
      printWidth,
      26
    );

    this.decomposeQuads(36, 26);
  }

  private wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): void {
    const words = text.split("");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n];
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  public decomposeQuads(cols = 36, rows = 26): void {
    this.quads = [];
    const quadW = this.width / cols;
    const quadH = this.height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        this.quads.push({
          sx: c * quadW,
          sy: r * quadH,
          sw: quadW,
          sh: quadH,
          width: quadW,
          height: quadH,
        });
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.offCanvas) {
      ctx.drawImage(this.offCanvas, x, y);
    }
  }
}
