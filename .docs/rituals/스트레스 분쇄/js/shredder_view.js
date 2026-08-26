// shredder_view.js - 3D Luxury Shredder Housing & Slit Mask Renderer
class ShredderView {
    constructor(x, y, width = 370, height = 150) {
        this.width = width;
        this.height = height;
        this.x = x || ((450 - width) / 2);
        this.y = y || Math.floor(800 * 0.535 + 0.5);


        this.gearAngle = 0;
        this.isOperating = false;
        this.pulseTimer = 0;

        // DESIGN.md Luxury Palette
        this.COLOR_BASE_BODY   = '#1C2129';
        this.COLOR_FRONT_SHELL = '#242B35';
        this.COLOR_TOP_CHAMFER = '#424D5C';
        this.COLOR_SLIT_INNER  = '#0A0D12';
        this.COLOR_SHADOW      = 'rgba(0, 0, 0, 0.30)';
        this.COLOR_STEEL_TEETH = '#7A8799';
        this.COLOR_BRAND_TEXT  = '#9EA8B8';
        this.COLOR_GREEN_GLOW  = '#00C473';
    }

    update(dt) {
        this.pulseTimer += dt * 4;
        if (this.isOperating) {
            this.gearAngle += dt * 10;
        }
    }

    getSlitY() {
        return this.y + 26;
    }

    drawRoundRect(ctx, x, y, width, height, radius) {
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

    // Layer 1: Machine Back Body Base (Unified 16px Corner Radius)
    drawBackSlot(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const margin = 24;
        const slotWidth = this.width - (margin * 2);
        const slotY = 24;

        // 1. Soft 3D Drop Shadow
        ctx.fillStyle = this.COLOR_SHADOW;
        this.drawRoundRect(ctx, 5, 8, this.width, this.height, 16);
        ctx.fill();

        // 2. Main Space-Gray Machine Base
        ctx.fillStyle = this.COLOR_BASE_BODY;
        this.drawRoundRect(ctx, 0, 0, this.width, this.height, 16);
        ctx.fill();

        // 3. Top Chamfer Edge Highlight
        ctx.fillStyle = this.COLOR_TOP_CHAMFER;
        this.drawRoundRect(ctx, 2, 2, this.width - 4, 12, 10);
        ctx.fill();

        // 4. Deep Black Hole Slot Opening
        ctx.fillStyle = this.COLOR_SLIT_INNER;
        this.drawRoundRect(ctx, margin - 2, slotY - 4, slotWidth + 4, 20, 4);
        ctx.fill();

        ctx.restore();
    }

    // Layer 3: Top Slot Interlocking Steel Teeth (Drawn OVER Paper to bite paper inside!)
    drawTopSlotHood(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const margin = 24;
        const slotWidth = this.width - (margin * 2);
        const slotY = 24;

        const numTeeth = 38;
        const toothSpacing = slotWidth / numTeeth;
        for (let i = 1; i <= numTeeth; i++) {
            const tx = margin + (i - 0.5) * toothSpacing;
            const gearPhase = (i % 2 === 0) ? 0 : Math.PI * 0.5;
            const offset = Math.sin(this.gearAngle + gearPhase) * 3.5;

            ctx.fillStyle = 'rgba(5, 8, 10, 0.85)';
            ctx.fillRect(tx - 1, slotY + offset - 2, 3, 18);

            ctx.fillStyle = this.COLOR_STEEL_TEETH;
            ctx.fillRect(tx - 1.5, slotY + offset - 3, 3, 18);

            ctx.fillStyle = 'rgba(191, 204, 224, 0.95)';
            ctx.fillRect(tx - 1.5, slotY + offset - 3, 3, 2);
        }


        ctx.restore();
    }


    // Layer 5: Lower Machine Front Shell Body Plate
    drawLowerFrontShell(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const slotY = 24;
        const shellTopY = slotY + 8;
        const shellHeight = this.height - shellTopY;


        // Solid Lower Front Shell Plate Body
        ctx.fillStyle = this.COLOR_FRONT_SHELL;
        this.drawRoundRect(ctx, 0, shellTopY, this.width, shellHeight, 16);
        ctx.fill();

        // Upper Bevel Lip
        ctx.fillStyle = this.COLOR_TOP_CHAMFER;
        ctx.fillRect(2, shellTopY, this.width - 4, 4);

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
            ctx.fillStyle = '#474F5C';
            ctx.beginPath();
            ctx.arc(ledX, ledY, 4.0, 0, Math.PI * 2);
            ctx.fill();
        }

        // High-End Embossed Brand Badge
        ctx.fillStyle = this.COLOR_BRAND_TEXT;
        ctx.font = '500 11px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('* MINDGYM 3D SHREDDER *', this.width / 2, this.height - 14);

        ctx.restore();
    }

    drawFrontHousing(ctx) {
        this.drawTopSlotHood(ctx);
        this.drawLowerFrontShell(ctx);
    }
}
