const canvas = document.getElementById('canvas--particle');
const ctx = canvas.getContext('2d');

let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//CONTROL PANEL
const particleSpeed = 0.5;
const particleSize = 1.5;
const darkParticlesRarity = 0.5;
const particleLifeSpan = 300;
const particleAmount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * particleSize + 1;
        this.speedY = Math.random() * particleSpeed + 1;
        this.speedX = Math.random() * 2 - 1;
        let essenceColor = getComputedStyle(document.documentElement).getPropertyValue('--essence').trim();
        this.color = Math.random() > darkParticlesRarity ? essenceColor : 'black';
        this.particleLifeSpan = Math.random() * particleLifeSpan + particleLifeSpan;
        this.shrinkRate = this.size / this.particleLifeSpan;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedX += Math.random() * 0.01 - 0.005;
        this.speedY += Math.random() * 0.01 - 0.005;
        this.size -= this.shrinkRate;
        if (this.size < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * particleSize + 1;
            this.speedY = Math.random() * particleSpeed + 1;
            this.speedX = Math.random() * 2 - 1;
            this.particleLifeSpan = Math.random() * particleLifeSpan + particleLifeSpan;
            this.shrinkRate = this.size / this.particleLifeSpan;
        }
        this.draw();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < particleAmount; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', function() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});