// app.js - Hybrid HTML DOM UI & HTML5 Canvas 2D MindGym Shredder Engine
(function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const screenW = 450;
    const screenH = 800;

    // DOM Elements
    const htmlUiContainer = document.getElementById('htmlUiContainer');
    const stressInput = document.getElementById('stressInput');
    const chipBtns = document.querySelectorAll('.chip-btn');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const btnShred = document.getElementById('btnShred');

    // Assets Loader with Existing Project Resources Fallback
    const images = {};
    const assetNames = {
        logo: ['../assets/images/logo.png', 'assets/images/logo.png'],
        loading: ['../assets/images/loading.png', 'assets/images/loading.png'],
        complete_badge: ['../assets/images/complete_badge.png', 'assets/images/complete_badge.png', '../assets/images/meditation.png'],
        meditation: ['../assets/images/meditation.png', 'assets/images/meditation.png']
    };

    function loadAssets() {
        Object.keys(assetNames).forEach(name => {
            const img = new Image();
            const paths = assetNames[name];
            img.src = paths[0];
            img.onerror = () => {
                if (paths[1]) img.src = paths[1];
            };
            images[name] = img;
        });
    }
    loadAssets();

    const soundSynth = new SoundSynth();

    // COLOR PALETTE
    const COLOR_SURFACE = '#F7FAF9';
    const COLOR_INK = '#1A1F29';
    const COLOR_GREEN = '#00C473';
    const COLOR_FOREST = '#005933';
    const COLOR_BAR_BG = '#E2EFE9';

    // State Variables
    let currentState = 'TYPING'; // 'TYPING', 'PRINTING', 'SHREDDING', 'CLEARED'
    let stateTimer = 0;
    let selectedSpeedFactor = 1.7;

    // Entities
    let paperCanvas = new PaperCanvas(290, 380);
    let shredderView = new ShredderView(undefined, undefined, 370, 150);
    let particles = [];

    // Printing / Shredding Phase Vars
    let paperX = (screenW - 290) / 2;
    let paperY = 0;
    let paperTargetY = 0;
    let feedProgress = 0;
    let shredProgress = 0;

    const healingPhrases = [
        { text: "무거웠던 생각들이 깨끗이 흩어집니다.", triggerProgress: 0.05 },
        { text: "나를 괴롭히던 마음의 짐을 내려놓습니다.", triggerProgress: 0.35 },
        { text: "오늘 하루 지친 나를 온전히 다독여 줍니다.", triggerProgress: 0.65 }
    ];

    let mainBtnRect = { x: (screenW - 260) / 2, y: screenH - 85, w: 260, h: 54 };

    // Helper crisp text
    function drawCrispText(ctx, text, x, y, align = 'center', font = '16px -apple-system, sans-serif', color = COLOR_INK) {
        ctx.save();
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';
        ctx.fillText(text, Math.floor(x), Math.floor(y));
        ctx.restore();
    }

    function drawRoundRect(ctx, x, y, width, height, radius) {
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

    // ----------------------------------------------------
    // HTML DOM EVENT BINDINGS
    // ----------------------------------------------------
    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            soundSynth.initCtx();
            stressInput.value = btn.dataset.text;
            soundSynth.playPaperFeedSound();
        });
    });

    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            soundSynth.initCtx();
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSpeedFactor = parseFloat(btn.dataset.factor);
            soundSynth.playPaperFeedSound();
        });
    });

    btnShred.addEventListener('click', () => {
        soundSynth.initCtx();
        enterPrinting();
    });

    // ----------------------------------------------------
    // STATE 2: PRINTING RENDER & UPDATE
    // ----------------------------------------------------
    function enterPrinting() {
        currentState = 'PRINTING';
        stateTimer = 0;
        feedProgress = 0;

        htmlUiContainer.classList.add('hidden');

        const userText = stressInput.value || '오늘 마음속 깊은 곳을 답답하게 만들었던 불안이나 스트레스를 이곳에 적어보세요.';
        paperCanvas.rasterizeText(userText);
        shredderView.isOperating = true;

        const paperW = 290;
        const paperH = 380;
        paperX = (screenW - paperW) / 2;

        const slitY = shredderView.getSlitY();
        paperY = slitY - paperH - 40;
        paperTargetY = slitY - paperH + 45;

        soundSynth.playPrintFeedSound();
    }

    function updatePrinting(dt) {
        stateTimer += dt;
        shredderView.update(dt * selectedSpeedFactor);

        feedProgress = Math.min(1.0, feedProgress + dt * (0.55 * selectedSpeedFactor));
        const t = Math.sin(feedProgress * Math.PI * 0.5);
        paperY = (paperY * (1.0 - t)) + (paperTargetY * t);

        if (feedProgress >= 1.0) {
            enterShredding();
        }
    }

    function renderPrinting() {
        const topY = 35;
        const spinnerY = topY + 16;

        // 1. Loading Spinner
        const loadingImg = images.loading;
        if (loadingImg && loadingImg.complete && loadingImg.naturalWidth > 0) {
            ctx.save();
            ctx.translate(screenW / 2, spinnerY);
            ctx.rotate(stateTimer * 5.5);
            ctx.drawImage(loadingImg, -12, -12, 24, 24);
            ctx.restore();
        }

        // 2. Wording Title
        drawCrispText(ctx, '작성한 마음을 파쇄기로 보내는 중...', screenW / 2, spinnerY + 36, 'center', '600 17px -apple-system, sans-serif', COLOR_INK);

        // 3. Machine Back Slot
        shredderView.drawBackSlot(ctx);

        // 4. Paper Feed Clip Masking (Top -> SlitY + 4 inside teeth slot)
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, screenW, shredderView.getSlitY() + 4);
        ctx.clip();

        paperCanvas.draw(ctx, paperX, paperY);
        ctx.restore();

        // 5. Machine Front Housing
        shredderView.drawFrontHousing(ctx);
    }

    // ----------------------------------------------------
    // STATE 3: SHREDDING RENDER & UPDATE
    // ----------------------------------------------------
    function enterShredding() {
        currentState = 'SHREDDING';
        stateTimer = 0;
        shredProgress = 0;
        particles = [];

        shredderView.isOperating = true;
        soundSynth.startShreddingSound();

        // Initial particle burst (inside lower shell)
        const startY = shredderView.getSlitY() + 18;
        for (let i = 0; i < 16; i++) {
            if (paperCanvas.quads.length > 0) {
                const randomQuad = paperCanvas.quads[Math.floor(Math.random() * paperCanvas.quads.length)];
                particles.push(new StripParticle(randomQuad, paperCanvas.offCanvas, paperX, startY));
            }
        }
    }

    function updateShredding(dt) {
        stateTimer += dt;
        shredderView.update(dt * 0.85 * selectedSpeedFactor);

        if (shredProgress < 1.0) {
            paperY += dt * (65 * selectedSpeedFactor);
            const slitY = shredderView.getSlitY();
            const totalTravel = 400;
            const currentDist = Math.max(0, paperY - (slitY - 380));
            shredProgress = Math.min(1.0, currentDist / totalTravel);

            // Particle Spawning (hidden behind front shell plate)
            if (Math.random() < (0.45 * selectedSpeedFactor) && paperCanvas.quads.length > 0) {
                const startY = slitY + 18;
                for (let b = 0; b < 2; b++) {
                    const q = paperCanvas.quads[Math.floor(Math.random() * paperCanvas.quads.length)];
                    particles.push(new StripParticle(q, paperCanvas.offCanvas, paperX, startY));
                }
            }

            if (paperY >= slitY + 20) {
                shredProgress = 1.0;
                shredderView.isOperating = false;
                soundSynth.stopShreddingSound();
                soundSynth.playCompleteSound();
                currentState = 'CLEARED';
                stateTimer = 0;
            }
        }

        particles.forEach(p => p.update(dt));
    }

    function renderShredding() {
        const slitY = shredderView.getSlitY();

        if (currentState === 'SHREDDING') {
            // Header Progress Bar & Healing Sentences
            const dotY = 32;

            // Wave dots
            for (let i = 1; i <= 5; i++) {
                const dotX = (screenW / 2) + (i - 3) * 18;
                const waveOffset = Math.sin(stateTimer * 6.5 + i * 0.85) * 4.5;
                ctx.fillStyle = COLOR_GREEN;
                ctx.beginPath();
                ctx.arc(dotX, dotY + waveOffset, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }

            // Bar
            const barW = 240;
            const barH = 8;
            const barX = (screenW - barW) / 2;
            const barY = dotY + 16;

            ctx.fillStyle = COLOR_BAR_BG;
            drawRoundRect(ctx, barX, barY, barW, barH, 4);
            ctx.fill();

            const fillW = Math.max(barH, barW * shredProgress);
            ctx.fillStyle = COLOR_GREEN;
            drawRoundRect(ctx, barX, barY, fillW, barH, 4);
            ctx.fill();

            // % Counter
            const pct = Math.floor(shredProgress * 100);
            drawCrispText(ctx, `마음 정화 진행률: ${pct}%`, screenW / 2, barY + 22, 'center', '500 13px -apple-system, sans-serif', COLOR_FOREST);

            // Healing Sentences with Smooth Fade & Slide Animation
            const basePhraseY = barY + 70;
            let currentLine = 0;

            healingPhrases.forEach(item => {
                if (shredProgress >= item.triggerProgress) {
                    currentLine++;
                    const targetY = basePhraseY + (currentLine - 1) * 44;
                    const elapsedProgress = shredProgress - item.triggerProgress;
                    const animTime = Math.min(1.0, elapsedProgress / 0.12);
                    
                    const slideOffset = (1.0 - Math.sin(animTime * Math.PI * 0.5)) * 14;
                    const lineY = targetY + slideOffset;
                    const alpha = animTime;
                    const breathScale = 1.0 + Math.sin(stateTimer * 2.2 + currentLine) * 0.012;

                    ctx.save();
                    ctx.globalAlpha = alpha;
                    ctx.translate(screenW / 2, lineY);
                    ctx.scale(breathScale, breathScale);
                    drawCrispText(ctx, item.text, 0, 0, 'center', '400 20px -apple-system, sans-serif', COLOR_INK);
                    ctx.restore();
                }
            });

            // Layer 1: Machine Back Body Base
            shredderView.drawBackSlot(ctx);

            // Layer 2: Paper Entry Slot (Cutoff at SlitY + 4 under teeth)
            if (paperCanvas && shredProgress < 1.0) {
                ctx.save();
                ctx.beginPath();
                ctx.rect(0, 0, screenW, slitY + 4);
                ctx.clip();

                paperCanvas.draw(ctx, paperX, paperY);
                ctx.restore();
            }

            // Layer 3: Top Slot Hood
            shredderView.drawTopSlotHood(ctx);

            // Layer 4: Shredded Particles (Masked BELOW Slit + 14 inside front shell)
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, slitY + 14, screenW, screenH - (slitY + 14));
            ctx.clip();

            particles.forEach(p => p.draw(ctx));
            ctx.restore();

            // Layer 5: Lower Front Shell
            shredderView.drawLowerFrontShell(ctx);
        } else if (currentState === 'CLEARED') {
            renderClearedState();
        }
    }

    // ----------------------------------------------------
    // STATE 4: CLEARED RENDER & UPDATE
    // ----------------------------------------------------
    function renderClearedState() {
        // 1. Cleared Title & Subtitle
        drawCrispText(ctx, '마음의 짐을 깨끗이 비워냈습니다!', screenW / 2, 50, 'center', 'bold 25px -apple-system, sans-serif', COLOR_INK);
        drawCrispText(ctx, '새로운 마음으로 가볍게 시작할 준비가 되었습니다.', screenW / 2, 88, 'center', '300 15px -apple-system, sans-serif', '#64748B');

        // 2. Pulsing Healing Character / Badge Image
        const stampY = Math.floor(screenH * 0.34);
        const rawProgress = Math.min(1.0, stateTimer * 3.5);
        let scale = 1.0;
        if (rawProgress < 1.0) {
            scale = Math.sin(rawProgress * Math.PI * 0.5);
        } else {
            scale = 1.0 + Math.sin((stateTimer - 0.28) * 2.2) * 0.025;
        }

        const badgeImg = images.complete_badge || images.meditation;
        if (badgeImg && badgeImg.complete && badgeImg.naturalWidth > 0) {
            ctx.save();
            ctx.translate(screenW / 2, stampY);
            ctx.scale(scale, scale);

            const targetSize = 220;
            ctx.beginPath();
            ctx.arc(0, 0, targetSize / 2, 0, Math.PI * 2);
            ctx.clip();

            const bw = badgeImg.naturalWidth;
            const bh = badgeImg.naturalHeight;
            const imgScale = targetSize / bh;

            ctx.drawImage(badgeImg, -(bw * imgScale) / 2, -(bh * imgScale) / 2, bw * imgScale, bh * imgScale);
            ctx.restore();
        }

        // 3. Floating Heart Pop (No +10 text)
        const scoreTime = stateTimer - 0.20;
        if (scoreTime > 0) {
            const scoreProgress = Math.min(1.0, scoreTime * 0.65);
            let popScale = 1.0;
            if (scoreProgress < 0.25) {
                popScale = (scoreProgress / 0.25) * 1.35;
            } else if (scoreProgress < 0.45) {
                popScale = 1.35 - ((scoreProgress - 0.25) / 0.20) * 0.35;
            }

            const floatUpY = stampY - 55 - (scoreProgress * 45);
            let alpha = 1.0;
            if (scoreProgress > 0.60) {
                alpha = Math.max(0, 1.0 - ((scoreProgress - 0.60) / 0.40));
            }

            if (alpha > 0) {
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.translate(screenW / 2 + 70, floatUpY);
                ctx.scale(popScale, popScale);
                drawCrispText(ctx, '💚', 0, 0, 'center', '28px -apple-system, sans-serif', COLOR_FOREST);
                ctx.restore();
            }
        }

        // Layer 1: Machine Back Body Base
        shredderView.drawBackSlot(ctx);

        // Layer 3: Top Slot Hood (Stopped Steel Teeth)
        shredderView.drawTopSlotHood(ctx);

        // Layer 4: Remaining Falling Particles (Masked BELOW Slit + 14)
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, shredderView.getSlitY() + 14, screenW, screenH);
        ctx.clip();

        particles.forEach(p => p.draw(ctx));
        ctx.restore();

        // Layer 5: Lower Front Shell Body Plate
        shredderView.drawLowerFrontShell(ctx);

        // 4. Main Reset Action Button ("다시 비우기")
        ctx.save();
        ctx.fillStyle = COLOR_GREEN;
        drawRoundRect(ctx, mainBtnRect.x, mainBtnRect.y, mainBtnRect.w, mainBtnRect.h, mainBtnRect.h / 2);
        ctx.fill();

        drawCrispText(ctx, '다시 비우기', mainBtnRect.x + mainBtnRect.w / 2, mainBtnRect.y + mainBtnRect.h / 2, 'center', 'bold 18px -apple-system, sans-serif', '#FFFFFF');
        ctx.restore();
    }

    // ----------------------------------------------------
    // CANVAS CLICK HANDLER FOR CLEARED RESET
    // ----------------------------------------------------
    function getCanvasCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function handleCanvasPointerDown(e) {
        soundSynth.initCtx();
        const pos = getCanvasCoordinates(e);

        if (currentState === 'CLEARED') {
            // Check Main Reset Button ("다시 비우기")
            if (pos.x >= mainBtnRect.x && pos.x <= mainBtnRect.x + mainBtnRect.w && pos.y >= mainBtnRect.y && pos.y <= mainBtnRect.y + mainBtnRect.h) {
                currentState = 'TYPING';
                stressInput.value = '';
                htmlUiContainer.classList.remove('hidden');
                stateTimer = 0;
                particles = [];
                soundSynth.playPaperFeedSound();
            }
        }
    }

    canvas.addEventListener('mousedown', handleCanvasPointerDown);
    canvas.addEventListener('touchstart', (e) => {
        handleCanvasPointerDown(e);
    });

    // ----------------------------------------------------
    // MAIN GAME LOOP (requestAnimationFrame & DeltaTime)
    // ----------------------------------------------------
    let lastTime = performance.now();

    function gameLoop(now) {
        const dt = Math.min(0.05, (now - lastTime) / 1000.0);
        lastTime = now;

        // Background Clear
        ctx.fillStyle = COLOR_SURFACE;
        ctx.fillRect(0, 0, screenW, screenH);

        if (currentState === 'PRINTING') {
            updatePrinting(dt);
            renderPrinting();
        } else if (currentState === 'SHREDDING' || currentState === 'CLEARED') {
            updateShredding(dt);
            renderShredding();
        }

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
})();
