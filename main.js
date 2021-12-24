const canvas = document.querySelector("#background");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

var particles = [];


class Particle {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.vy = Math.random() - 0.5;
        this.vx = Math.random() - 0.5;
    }

    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }

    update () {
        particles.forEach(particle => {
            let x1 = particle.x;
            let y1 = particle.y;
            let x2 = this.x;
            let y2 = this.y;
            var distance = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.strokeStyle = "#ffffff10";
                ctx.stroke();
            }
        });

        if (this.x > innerWidth || this.x < 0) {
            this.vx *= -1;
        }
        if (this.y > innerHeight || this.y < 0) {
            this.vy *= -1;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
    }
}

var prev = {x: 0, y: 0};
document.addEventListener("mousemove", function (event) {
    var mouseDelta = Math.sqrt(Math.pow(event.x - prev.x, 2) + Math.pow(event.y - prev.y, 2));
    if (mouseDelta > 30) {
        particles.shift();
        particles.push(new Particle(event.x, event.y));
        prev.x = event.x;
        prev.y = event.y;
    }
})

for (var i = 0; i < 100; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    particles.push(new Particle(x, y));
}


function animate () {
    requestAnimationFrame(animate);

    ctx.fillStyle = "#14213d";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    particles.forEach(particle => {
        particle.update();
    });
}
animate();
