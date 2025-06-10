//game constants and variables


let directions = { x: 0, y: 0 };
const moveSound = new Audio("move.mp3");
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");

let speed = 10;
let lastpainttime = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;


//Game functions
function main(ctime) {
	window.requestAnimationFrame(main);
	// console.log(ctime);

	if ((ctime - lastpainttime) / 1000 < 1/speed) {
		return;
	}

	lastpainttime = ctime;
	gameEngine();
}

function collide(snake){
	//if you bump into yourself

	for(let i = 1 ; i < snakeArray.length ; i++){
		if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
			return true;
		}
	}

	if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
		return true;
	}

	return false;
}

function gameEngine() {

	//Updating snake and food

	if(collide(snakeArray)){
		gameOverSound.play();
		directions = { x: 0, y: 0 };
		alert("Game Over :( Press any key to play again!");
		snakeArray = [{ x: 13, y: 15 }];
		food = { x: 6, y: 7 };
		scoreBox.innerHTML = "Score: 0";
		return;
	}


	//if you have eaten the food, regenerating the food

	if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
		foodSound.play();
		score++;

		if(score > hiScore){
			hiScoreval = score;
			localStorage.setItem("hiScore", JSON.stringify(hiScoreval));
			highScore.innerHTML = "High Score: " + hiScoreval;
		}

		scoreBox.innerHTML = "Score: " + score;
		snakeArray.unshift({ x: snakeArray[0].x + directions.x, y: snakeArray[0].y + directions.y });
		let a = 2, b = 16;

		food = { x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random()) };

		 
	}

	//Move the snake

	for(let i = snakeArray.length-2 ; i >= 0; i--){
		snakeArray[i+1] = {...snakeArray[i]};
	}

	snakeArray[0].x += directions.x;
	snakeArray[0].y += directions.y; 




	//Updating the snake array and food

	playArea.innerHTML = "";

	//Display snake

	snakeArray.forEach((e, index) => {

		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;



		if (index === 0) {
			snakeElement.classList.add("head");
		} else {
			snakeElement.classList.add("snake");
		}

		playArea.appendChild(snakeElement);
	})

	//display food

	foodElement = document.createElement('div');

	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;

	foodElement.classList.add("food");
	playArea.appendChild(foodElement);



}


//Main logic function running the game

let hiScore = localStorage.getItem("hiScore");

if(hiScore === null){
	hiScoreval = 0;
	localStorage.setItem("hiScore", JSON.stringify(hiScoreval));
}else{
	hiScoreval = JSON.parse(hiScore);
	highScore.innerHTML = "High Score: " + hiScore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
	directions.x = 0;
	directions.y = 1;
	switch (e.key) {
		case "ArrowUp": 
			//console.log("ArrowUp");
			directions.x = 0;
			directions.y = -1;
			break;
		case "ArrowDown": 
			//console.log("ArrowDown");
			directions.x = 0;
			directions.y = 1;
			break;
		case "ArrowLeft":
			//console.log("ArrowLeft");
			directions.x = -1;
			directions.y = 0;
			break;
		case "ArrowRight":
			//console.log("ArrowRight");
			directions.x = 1;
			directions.y = 0;
			break;
		default: console.log("Default");
	}
})

