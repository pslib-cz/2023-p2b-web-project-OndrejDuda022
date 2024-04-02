const canvas = document.getElementById('canvas--particle');
const ctx = canvas.getContext('2d');

let particlesArray;

// get size of window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//CONTROL PANEL
const particleSpeed = 0.5;
const particleSize = 1.5;
const darkParticlesRarity = 0.5;
const particleLifeSpan = 300;
const particleAmount = 50;

// create particles
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; // particle start position
        this.y = canvas.height; // particle start at bottom of screen
        this.size = Math.random() * particleSize + 1; // particle size
        this.speedY = Math.random() * particleSpeed + 1; // particle rise speed
        this.speedX = Math.random() * 2 - 1; // particle horizontal speed
        let essenceColor = getComputedStyle(document.documentElement).getPropertyValue('--essence').trim();
        this.color = Math.random() > darkParticlesRarity ? essenceColor : 'black'; // particle color
        this.particleLifeSpan = Math.random() * particleLifeSpan + particleLifeSpan; // lifespan of the particle
        this.shrinkRate = this.size / this.particleLifeSpan; // rate at which particle shrinks
    }
    // method to draw individual particle
    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    // method to move the particle
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        // Change speed and direction over time for more spark-like behavior
        this.speedX += Math.random() * 0.01 - 0.005;
        this.speedY += Math.random() * 0.01 - 0.005;
        this.size -= this.shrinkRate; // decrease the size of the particle
        if (this.size < 0) { // if the size is less than 0, reset the particle
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * particleSize + 1;
            this.speedY = Math.random() * particleSpeed + 1;
            this.speedX = Math.random() * 2 - 1;
            this.particleLifeSpan = Math.random() * particleLifeSpan + particleLifeSpan; // lifespan of the particle
            this.shrinkRate = this.size / this.particleLifeSpan; // rate at which particle shrinks
        }
        this.draw();
    }
}

// create particle array
function init() {
    particlesArray = [];
    for (let i = 0; i < particleAmount; i++) {
        particlesArray.push(new Particle());
    }
}

// animate particles
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
    // Update the canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reinitialize particles
    init();
});