export class ShredderView {
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  public gearAngle = 0;
  public isOperating = false;
  public pulseTimer = 0;
  public useGlossyLook: boolean = true; // true: 프리미엄 메탈릭 3D 광택 모드, false: 기존 원본 플랫 모드

  // Luxury Color Palette
  public COLOR_BASE_BODY = "#1C2129";
  public COLOR_FRONT_SHELL = "#242B35";
  public COLOR_TOP_CHAMFER = "#424D5C";
  public COLOR_SLIT_INNER = "#0A0D12";
  public COLOR_SHADOW = "rgba(0, 0, 0, 0.30)";
  public COLOR_STEEL_TEETH = "#7A8799";
  public COLOR_BRAND_TEXT = "#9EA8B8";
  public COLOR_GREEN_GLOW = "#00C473";

  constructor(x?: number, y?: number, width = 370, height = 150) {
    this.width = width;
    this.height = height;
    this.x = x ?? (450 - width) / 2;
    this.y = y ?? Math.floor(800 * 0.535 + 0.5);
  }

  public update(dt: number): void {
    this.pulseTimer += dt * 4;
    if (this.isOperating) {
      this.gearAngle += dt * 10;
    }
  }

  public getSlitY(): number {
    return this.y + 26;
  }

  public drawRoundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Layer 1: Machine Back Body Base
  public drawBackSlot(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);

    const margin = 24;
    const slotWidth = this.width - margin * 2;
    const slotY = 24;

    // 1. Soft 3D Drop Shadow
    ctx.fillStyle = this.COLOR_SHADOW;
    this.drawRoundRect(ctx, 5, 8, this.width, this.height, 16);
    ctx.fill();

    // 2. Main Space-Gray Machine Base (Glossy vs Flat)
    if (this.useGlossyLook) {
      const grad = ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0.0, "#2D3644");
      grad.addColorStop(0.5, "#1C2129");
      grad.addColorStop(1.0, "#12161C");
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = this.COLOR_BASE_BODY;
    }
    this.drawRoundRect(ctx, 0, 0, this.width, this.height, 16);
    ctx.fill();

    // 3. Top Chamfer Edge Highlight (Glossy Specular)
    if (this.useGlossyLook) {
      const topGrad = ctx.createLinearGradient(0, 2, 0, 14);
      topGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.45)");
      topGrad.addColorStop(0.5, "rgba(160, 180, 205, 0.25)");
      topGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.3)");
      ctx.fillStyle = topGrad;
    } else {
      ctx.fillStyle = this.COLOR_TOP_CHAMFER;
    }
    this.drawRoundRect(ctx, 2, 2, this.width - 4, 12, 10);
    ctx.fill();

    // 4. Deep Black Hole Slot Opening
    ctx.fillStyle = this.COLOR_SLIT_INNER;
    this.drawRoundRect(ctx, margin - 2, slotY - 4, slotWidth + 4, 20, 4);
    ctx.fill();

    // Slot inner rim specular shine
    if (this.useGlossyLook) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      this.drawRoundRect(ctx, margin - 2, slotY - 4, slotWidth + 4, 20, 4);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Layer 3: Top Slot Interlocking Steel Teeth
  public drawTopSlotHood(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);

    const margin = 24;
    const slotWidth = this.width - margin * 2;
    const slotY = 24;

    const numTeeth = 38;
    const toothSpacing = slotWidth / numTeeth;
    for (let i = 1; i <= numTeeth; i++) {
      const tx = margin + (i - 0.5) * toothSpacing;
      const gearPhase = i % 2 === 0 ? 0 : Math.PI * 0.5;
      const offset = Math.sin(this.gearAngle + gearPhase) * 3.5;

      ctx.fillStyle = "rgba(5, 8, 10, 0.85)";
      ctx.fillRect(tx - 1, slotY + offset - 2, 3, 18);

      ctx.fillStyle = this.COLOR_STEEL_TEETH;
      ctx.fillRect(tx - 1.5, slotY + offset - 3, 3, 18);

      ctx.fillStyle = "rgba(191, 204, 224, 0.95)";
      ctx.fillRect(tx - 1.5, slotY + offset - 3, 3, 2);
    }

    ctx.restore();
  }

  // Layer 5: Lower Machine Front Shell Body Plate
  public drawLowerFrontShell(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);

    const slotY = 24;
    const shellTopY = slotY + 8;
    const shellHeight = this.height - shellTopY;

    // Solid Lower Front Shell Plate Body (Glossy vs Flat)
    if (this.useGlossyLook) {
      // 1. Machined Metallic Gradient Body
      const shellGrad = ctx.createLinearGradient(0, shellTopY, 0, this.height);
      shellGrad.addColorStop(0.0, "#364150"); // Top highlight lip
      shellGrad.addColorStop(0.15, "#2B3340");
      shellGrad.addColorStop(0.5, "#202732");
      shellGrad.addColorStop(0.85, "#171D26");
      shellGrad.addColorStop(1.0, "#0E1218"); // Bottom shadow
      ctx.fillStyle = shellGrad;
    } else {
      ctx.fillStyle = this.COLOR_FRONT_SHELL;
    }
    this.drawRoundRect(ctx, 0, shellTopY, this.width, shellHeight, 16);
    ctx.fill();

    // Glossy Specular Light Reflection Sweep (45-degree Glossy Sheen)
    if (this.useGlossyLook) {
      ctx.save();
      this.drawRoundRect(ctx, 0, shellTopY, this.width, shellHeight, 16);
      ctx.clip();

      const glossGrad = ctx.createLinearGradient(
        0,
        shellTopY,
        this.width * 0.8,
        this.height
      );
      glossGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.16)");
      glossGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.05)");
      glossGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.0)");
      glossGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.25)");

      ctx.fillStyle = glossGrad;
      ctx.fillRect(0, shellTopY, this.width, shellHeight);

      // Top Bevel Metallic Rim Highlight
      ctx.strokeStyle = "rgba(255, 255, 255, 0.38)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(10, shellTopY + 1);
      ctx.lineTo(this.width - 10, shellTopY + 1);
      ctx.stroke();

      ctx.restore();
    } else {
      // Upper Bevel Lip (Flat)
      ctx.fillStyle = this.COLOR_TOP_CHAMFER;
      ctx.fillRect(2, shellTopY, this.width - 4, 4);
    }

    // Digital Glowing Emerald LED Indicator Dot (Centered)
    const ledX = this.width / 2;
    const ledY = 58;

    if (this.isOperating) {
      const glowAlpha = 0.35 + Math.sin(this.pulseTimer) * 0.15;
      ctx.fillStyle = `rgba(0, 196, 115, ${glowAlpha})`;
      ctx.beginPath();
      ctx.arc(ledX, ledY, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.COLOR_GREEN_GLOW;
      ctx.beginPath();
      ctx.arc(ledX, ledY, 4.0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#474F5C";
      ctx.beginPath();
      ctx.arc(ledX, ledY, 4.0, 0, Math.PI * 2);
      ctx.fill();
    }

    // High-End Embossed Brand Badge
    ctx.fillStyle = this.useGlossyLook ? "rgba(215, 225, 240, 0.85)" : this.COLOR_BRAND_TEXT;
    ctx.font = '600 11px "NanumSquareRound", "Pretendard", -apple-system, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("* MINDGYM 3D SHREDDER *", this.width / 2, this.height - 14);

    ctx.restore();
  }

  public drawFrontHousing(ctx: CanvasRenderingContext2D): void {
    this.drawTopSlotHood(ctx);
    this.drawLowerFrontShell(ctx);
  }
}
