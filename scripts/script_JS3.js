const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j]) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
            }
        }
    }
}


let balls = [];

while (balls.length < 20) {
    let size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        randomColor(),
        size
    );
    balls.push(ball);
}
para.textContent = 'Ball count: ' + balls.length + ' .';



function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
}

EvilCircle.prototype.serControls = function() {
    window.onkeydown = e => {
        switch (e.key) {
            case 'a':
                this.x -= this.velX;
                break;
            case 'd':
                this.x += this.velX;
                break;
            case 'w':
                this.y -= this.velY;
                break;
            case 's':
                this.y += this.velY;
                break;
        }
    };
}

let count = balls.length;

EvilCircle.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists === true) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count--;
                para.textContent = 'Ball count: ' + count + ' .';
                break;

            }
        }
    }
}
let evisize = 10;
let eveil = new EvilCircle(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + evisize, width - evisize),
    random(0 + evisize, height - evisize),
    true
);
eveil.serControls();




function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        eveil.draw();
        eveil.checkBounds();
        eveil.collisionDetect();
        if (balls[i].exists === true) {
            balls[i].draw();
            balls[i].collisionDetect();
            balls[i].update();
        }
    }
    requestAnimationFrame(loop);
}

loop();