// sound_synth.js - Pure Web Audio API Procedural DSP Synthesizer
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.shredBufferNode = null;
        this.shredGainNode = null;
        this.isShreddingPlaying = false;
    }

    initCtx() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playPaperFeedSound() {
        this.initCtx();
        if (!this.ctx) return;

        const duration = 0.30;
        const sampleRate = this.ctx.sampleRate;
        const buffer = this.ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        let lastSample = 0;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const env = Math.sin((i / data.length) * Math.PI);
            const white = (Math.random() * 2 - 1) * 0.06 * env;
            lastSample = lastSample + 0.10 * (white - lastSample);
            const warmSub = Math.sin(2 * Math.PI * 64 * t) * 0.12 * env;
            data[i] = Math.max(-0.85, Math.min(0.85, (lastSample + warmSub) * 0.60));
        }

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.50;
        src.connect(gain);
        gain.connect(this.ctx.destination);
        src.start();
    }

    playPrintFeedSound() {
        this.playPaperFeedSound();
    }

    startShreddingSound() {
        this.initCtx();
        if (!this.ctx || this.isShreddingPlaying) return;

        const duration = 2.0;
        const sampleRate = this.ctx.sampleRate;
        const buffer = this.ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        let lastSample = 0;

        for (let i = 0; i < data.length; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            const brownNoise = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            b6 = white * 0.115926;

            lastSample = lastSample + 0.08 * (brownNoise * 0.08 - lastSample);
            const t = i / sampleRate;
            const earthHum = Math.sin(2 * Math.PI * 54 * t) * 0.14;
            const softWoodRumble = Math.sin(2 * Math.PI * 72 * t) * 0.08;

            let mixed = (lastSample * 0.65) + (earthHum * 0.22) + (softWoodRumble * 0.13);
            data[i] = Math.max(-0.85, Math.min(0.85, mixed * 0.70));
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

    stopShreddingSound() {
        if (this.shredGainNode && this.ctx) {
            try {
                this.shredGainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
                setTimeout(() => {
                    if (this.shredBufferNode) {
                        this.shredBufferNode.stop();
                        this.shredBufferNode.disconnect();
                        this.shredBufferNode = null;
                    }
                    this.isShreddingPlaying = false;
                }, 160);
            } catch (e) {
                this.isShreddingPlaying = false;
            }
        } else {
            this.isShreddingPlaying = false;
        }
    }

    playCompleteSound() {
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

            let chime = (omTone + healingTone + subWarmth) * decay;
            data[i] = Math.max(-0.85, Math.min(0.85, chime * 0.70));
        }

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.70;
        src.connect(gain);
        gain.connect(this.ctx.destination);
        src.start();
    }
}
