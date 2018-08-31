const center = document.querySelector('.center');
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
const pog = new Image();
const poggerChampion = {
	"poggers": 'https://cdn.discordapp.com/emojis/440658615880253440.png',
	"monka"  : 'https://cdn.discordapp.com/emojis/390321742624849920.png',
	"doggers": 'https://cdn.discordapp.com/emojis/426582202168639488.png',
	"thonk"  : 'https://cdn.discordapp.com/emojis/264701195573133315.png'
}

const height = 80;
const size = 20;

let leftWins = 0;
let rightWins = 0;
let poggers = false;
let currentPog = 'poggers';

const reset = () => {
	cvs.width = innerWidth;
	cvs.height = innerHeight;

	ctx.fillRect(0, 0, cvs.width, cvs.height);
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, cvs.width, size);
	ctx.fillRect(0, cvs.height - size, cvs.width, size);
	ctx.font = '40px monospace';
	ctx.textAlign = 'right';
	ctx.fillText(leftWins, (cvs.width / 2) - 20, size + 50);
	ctx.textAlign = 'left';
	ctx.fillText(rightWins, (cvs.width / 2) + 20, size + 50);

	for (let i = 0; i < cvs.width; i += size)
		ctx.fillRect((cvs.width / 2) - (size / 2), (i * 2) - (size / 2), size, size);
};

class Base {
	get left() {
		return this.x;
	}

	get right() {
		return this.x + this.width;
	}

	get top() {
		return this.y;
	}

	get bot() {
		return this.y + this.height;
	}
}

class Paddle extends Base {
	constructor(x) {
		super();
		this.width = 20;
		this.height = 80;

		this.x = x;
		this.calcY();
	}

	calcY() {
		this.y = (cvs.height - this.height) / 2;
	}

	move(y) {
		this.moveTo(this.y - y);
	}

	moveTo(y) {
		this.y = Math.max(Math.min(y, cvs.height - size - this.height), 0 + size);
	}
}

class Ball extends Base {
	constructor() {
		super();
		this.x = cvs.width / 2;
		this.y = cvs.height / 2;
		this.speed = 7;
		this.xDelta = Math.round(Math.random()) ? this.speed : -this.speed;
		this.yDelta = 0;

		this.width = 15;
		this.height = 15;
	}
}

const play = () => {
	let ended = false;
	const leftPaddle = new Paddle(0);
	const rightPaddle = new Paddle(cvs.width - size);
	const ball = new Ball();

	const keys = {
		ArrowUp: () => rightPaddle.move(2),
		ArrowDown: () => rightPaddle.move(-2),
	};
	let sequence = '';

	window.onkeydown = evt => {
		sequence += evt.key.toLowerCase();
		let potentialPoggers = '';
		if (poggerChampion.some(puggers => {
			potentialPoggers = puggers;
			return sequence.endsWith(puggers);
		})){
			poggers = currentPoggers === potentialPoggers ? !poggers : true;
			pog.src = poggerChampion[currentPoggers = potentialPoggers];
		}
		const action = keys[evt.key];
		if (action) {
			if (action.pressed) return;
			action.pressed = true;
			const interval = setInterval(() => {
				if (!action.pressed) return clearInterval(interval);
				action();
			}, 3);
		}
	};

	window.onkeyup = evt => {
		const action = keys[evt.key];
		if (action) action.pressed = false;
	};

	const scoreInterval = setInterval(() => {
		if (ended) return clearInterval(scoreInterval);

		ball.x += ball.xDelta;
		ball.y += ball.yDelta;

		if (ball.top <= leftPaddle.top) leftPaddle.move(2.5);
		if (ball.bot >= leftPaddle.bot) leftPaddle.move(-2.5);

		if (ball.top <= size || ball.bot >= cvs.height - size) ball.yDelta *= -1;
		const touchingLeft = ball.left <= leftPaddle.right && ball.top <= leftPaddle.bot && ball.bot >= leftPaddle.top && ball.xDelta === -ball.speed;
		const touchingRight = ball.right >= rightPaddle.left && ball.top <= rightPaddle.bot && ball.bot >= rightPaddle.top && ball.xDelta === ball.speed;

		if (touchingLeft || touchingRight) {
			ball.xDelta *= -1;
			ball.yDelta = (Math.random() * 7) - 3;
		}

		const winLeft = ball.right >= cvs.width;
		const winRight = ball.left <= 0;

		if (winLeft || winRight) {
			if (winLeft) leftWins++;
			else rightWins++;
			ended = true;
			play();
		}
	}, 1000 / 80);

	const frame = () => {
		if (ended) return;

		reset();

		ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
		ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
		if (poggers) {
			pog.width = ball.width;
			pog.height = ball.height;
			ctx.drawImage(pog, ball.x, ball.y, ball.width, ball.height);
		}
		else ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

		requestAnimationFrame(frame);
	};
	window.onresize = () => {
		frame();
		rightPaddle.x = cvs.width - size;
		rightPaddle.calcY();
	};
	requestAnimationFrame(frame);
};

reset();
play();
