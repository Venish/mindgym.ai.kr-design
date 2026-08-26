// paper_raster.js - Offscreen Canvas Text Rasterizer & Strip Particle System
class PaperCanvas {
    constructor(width = 290, height = 380) {
        this.width = width;
        this.height = height;
        this.offCanvas = document.createElement('canvas');
        this.offCanvas.width = width;
        this.offCanvas.height = height;
        this.ctx = this.offCanvas.getContext('2d');
        this.quads = [];
    }

    rasterizeText(text) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // 1. Soft Mint Paper Background
        ctx.fillStyle = '#EDF7F2';
        ctx.fillRect(0, 0, this.width, this.height);

        // 2. Faint Stationery Ruling Lines
        ctx.strokeStyle = 'rgba(209, 230, 219, 0.6)';
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
        ctx.strokeStyle = 'rgba(217, 232, 224, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(1, 1, this.width - 2, this.height - 2);

        // 4. Crisp Typography Wrap
        ctx.fillStyle = '#1A1F29';
        ctx.font = '500 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

        const margin = 24;
        const printWidth = this.width - (margin * 2);
        this.wrapText(ctx, text || '오늘 마음속 깊은 곳을 답답하게 만들었던 불안이나 스트레스를 이곳에 적어보세요.', margin, margin + 20, printWidth, 26);

        this.decomposeQuads(36, 26);
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split('');
        let line = '';
        let currentY = y;

        for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n];
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
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

    decomposeQuads(cols = 36, rows = 26) {
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
                    height: quadH
                });
            }
        }
    }

    draw(ctx, x, y) {
        if (this.offCanvas) {
            ctx.drawImage(this.offCanvas, x, y);
        }
    }
}

class StripParticle {
    constructor(quad, offCanvas, paperX, startY) {
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

    update(dt) {
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

    draw(ctx) {
        if (this.opacity <= 0) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.globalAlpha = this.opacity;

        ctx.drawImage(
            this.offCanvas,
            this.quad.sx, this.quad.sy, this.quad.sw, this.quad.sh,
            -this.quad.sw / 2, -this.quad.sh / 2, this.quad.sw, this.quad.sh
        );

        ctx.restore();
    }
}
