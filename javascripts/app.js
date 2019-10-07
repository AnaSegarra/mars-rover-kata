// Rovers constructor
var Rovers = function(name, direction, x, y) {
	this.name = name;
	this.direction = direction;
	this.x = x;
	this.y = y;
	this.travelLog = [ `(${x}, ${y})` ];
};

//Main rover object
var mR = new Rovers('mR', 'N', 0, 0);

// Grid display
var grid = [];
function createGrid() {
	for (var i = 0; i <= 10; i++) {
		grid[i] = [];
		for (var j = 0; j <= 10; j++) {
			grid[i][j] = ',';
		}
	}
	grid[0][0] = mR.name; //set main rover at initial position
}
createGrid();

// ======================
// ROVER MOVEMENT
function turnLeft(rover) {
	switch (rover.direction) {
		case 'N':
			rover.direction = 'W';
			break;
		case 'W':
			rover.direction = 'S';
			break;
		case 'S':
			rover.direction = 'E';
			break;
		case 'E':
			rover.direction = 'N';
	}
}

function turnRight(rover) {
	switch (rover.direction) {
		case 'N':
			rover.direction = 'E';
			break;
		case 'E':
			rover.direction = 'S';
			break;
		case 'S':
			rover.direction = 'W';
			break;
		case 'W':
			rover.direction = 'N';
	}
}

function moveForward(rover) {
	var newX = rover.x;
	var newY = rover.y;
	switch (rover.direction) {
		case 'N':
			newY--;
			break;
		case 'E':
			newX++;
			break;
		case 'S':
			newY++;
			break;
		case 'W':
			newX--;
	}
	setNewPosition(rover, newX, newY);
}

function moveBackwards(rover) {
	var newX = rover.x;
	var newY = rover.y;
	switch (rover.direction) {
		case 'N':
			newY++;
			break;
		case 'E':
			newX--;
			break;
		case 'S':
			newY--;
			break;
		case 'W':
			newX++;
	}
	setNewPosition(rover, newX, newY);
}

function commands(str, rover) {
	for (var i = 0; i < str.length; i++) {
		switch (str[i]) {
			case 'f':
				moveForward(rover);
				break;
			case 'r':
				turnRight(rover);
				break;
			case 'l':
				turnLeft(rover);
				break;
			case 'b':
				moveBackwards(rover);
				break;
			default:
				console.log('That command is invalid, try again');
				break;
		}
	}
	console.log(
		`Your rover has traveled over ${rover.travelLog}.\nNow, it's at coordinates (${rover.x}, ${rover.y}) and facing ${rover.direction}.`
	);
}

//ROVER POSITION
function setNewPosition(rover, newX, newY) {
	if (newX < 0 || newX > 10 || newY < 0 || newY > 10) {
		console.log('Your rover is getting off the grid');
	} else if (grid[newY][newX].startsWith('R') || grid[newY][newX] === 'mR') {
		console.log("You're running into another rover!");
	} else if (grid[newY][newX].startsWith('o')) {
		console.log(`An obstacle is blocking your way!`);
	} else {
		grid[rover.y][rover.x] = ','; //remove rover from previous position
		rover.x = newX;
		rover.y = newY;
		grid[rover.y][rover.x] = rover.name; //set rover at current position
		rover.travelLog.push(`(${rover.x}, ${rover.y})`);
	}
}

// ======================
// OBSTACLES
var allObstacles = [];
var Obstacle = function(id, x, y) {
	this.id = `o${id}`;
	this.x = x;
	this.y = y;
};
var num = Math.floor(Math.random() * 3) + 1;

function createObstacle(n) {
	var obsX, obsY, newObs;
	for (var i = 0; i < n; i++) {
		obsX = randomCoordinate();
		obsY = randomCoordinate();
		grid[obsY][obsX] = 'o' + (i + 1);
		newObs = new Obstacle(i + 1, obsX, obsY);
		allObstacles.push(newObs);
	}
}

createObstacle(num); //create random number of obstacles

// ======================
//Other rovers
var allRovers = [];
function createRandRovers(num) {
	var x, y, direction, newRov;
	for (var i = 0; i < num; i++) {
		x = randomCoordinate();
		y = randomCoordinate();
		direction = getRandomdir();
		if (grid[y][x] === ',') {
			grid[y][x] = 'R' + (i + 1);
			newRov = new Rovers('R' + (i + 1), direction, x, y);
			allRovers.push(newRov);
		}
	}
}

var numRovers = 2;
createRandRovers(numRovers); //create fixed number of rovers

//Randomizing rovers
function randomCoordinate() {
	return Math.floor(Math.random() * 10) + 1;
}

function getRandomdir() {
	var randomDir, directions;
	directions = [ 'N', 'S', 'E', 'W' ];
	randomDir = directions[Math.floor(Math.random() * directions.length)];
	return randomDir;
}
