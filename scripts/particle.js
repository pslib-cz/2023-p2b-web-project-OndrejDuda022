const canvas = document.getElementById('canvas--particle');
const ctx = canvas.getContext('2d');

let particlesArray;

// get size of window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleSpeed = 0.2;
const particleSize = 1;

// create particles
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; // particle start position
        this.y = canvas.height; // particle start at bottom of screen
        this.size = Math.random() * particleSize + 1; // particle size
        this.speedY = Math.random() * particleSpeed + 1; // particle rise speed
        this.speedX = Math.random() * 2 - 1; // particle horizontal speed
        let essenceColor = getComputedStyle(document.documentElement).getPropertyValue('--essence').trim();
        this.color = Math.random() > 0.3 ? essenceColor : 'black'; // particle color
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
        if (this.y < 0 - this.size || Math.random() < 0.01) { // 1% chance to disappear during flight
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
            this.speedY = Math.random() * particleSpeed + 1;
            this.speedX = Math.random() * 2 - 1;
        }
        this.draw();
    }
}

// create particle array
function init() {
    particlesArray = [];
    for (let i = 0; i < 20; i++) {
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