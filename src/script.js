// Solution 2D array

// //create grid
// export const make2DArray = (grid, given) => {
// 	const gen = new Array(grid[0]);

// 	// Loop to create 2D array using 1D array
// 	for (let i = 0; i < grid[0]; i++) {
// 		gen[i] = new Array(grid[1]);
// 	}

// 	// Loop to initialize 2D array elements.
// 	for (let i = 0; i < grid[0]; i++) {
// 		for (let j = 0; j < grid[1]; j++) {
// 			gen[i][j] = given ? given[i][j] : 0;
// 		}
// 	}

// 	return gen;
// };

// //create generation 0
// export const createGeneration0 = (grid, live) => {
// 	const newGen = make2DArray(grid);

// 	for (let i = 0; i < grid[0]; i++) {
// 		for (let j = 0; j < grid[1]; j++) {
// 			let cell = 0;

// 			//chekcs cell is alive in gen 0
// 			live.forEach((el) => {
// 				if (el === `${i},${j}`) cell = 1;
// 			});
// 			newGen[i][j] = cell;
// 		}
// 	}

// 	return newGen;
// };

// //check if the cell will be dead or alive
// const checkNeighbours = (gen, i, j) => {
// 	let cell = 0;

// 	for (let a = 0; a < 3; a++) {
// 		for (let b = 0; b < 3; b++) {
// 			cell += gen[a + i - 1][b + j - 1];
// 		}
// 	}

// 	let result = 0;

// 	//if watching cell is alive
// 	if (gen[i][j] === 1) {
// 		//cell includes and watching cell
// 		switch (cell - 1) {
// 			case 2:
// 				result = 1;
// 				break;
// 			case 3:
// 				result = 1;
// 				break;
// 			default:
// 				result = 0;
// 		}

// 		//if watching cell is dead
// 	} else {
// 		if (cell === 3) result = 1;
// 		else result = 0;
// 	}

// 	return result;
// };

// //create next generation
// export const nextGeneration = (grid, gen) => {
// 	const newGen = make2DArray(grid, gen);

// 	// i=1 and j=1 are because first and last row and last column are seen as the do not exist
// 	for (let i = 1; i < grid[0] - 1; i++) {
// 		for (let j = 1; j < grid[1] - 1; j++) {
// 			newGen[i][j] = checkNeighbours(gen, i, j);
// 		}
// 	}

// 	return newGen;
// };

//////////////////////////////////////////////////
// Solution with Map

//create grid

/*
map {
	rowMin: -12;
	rowMax: 42;
	columnMin: -32;
	columnMin: 52
	'13,13':true;
}
*/

const getAliveNeighbours = (cords, generation) => {
	let aliveCells = 0;
	const [row, column] = cords.split(',');

	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = column - 1; j <= column + 1; j++) {
			if (generation.has(`${i},${j}`)) {
				aliveCells++;
			}
			//if
			else {
				checkDeadCell(`${i},${j}`, generation);
			}
		}
	}

	return aliveCells;
};

const checkDeadCell = (cords, generation) => {
	const aliveNeighbours = getAliveNeighbours(cords, generation);

	if (aliveNeighbours === 3) {
		generation.set(cords, true);
	}
};

const checkCellForNextGeneration = (value, cords, generation) => {
	//check alive cell
	const aliveNeighbours = getAliveNeighbours(cords, generation);
	if (aliveNeighbours < 2 || aliveNeighbours > 3) {
		generation.delete(cords);
	}

	//check dead cells around alive cells
	checkDeadCell(cords);
};

const createNextGeneration = (generation) => {
	const newGeneration = new Map(
		JSON.parse(JSON.stringify(Array.from(generation)))
	);

	newGeneration.forEach(checkCellForNextGeneration);
};

const checkedDeadCells = new Map();
const currentGeneration = new Map();

currentGeneration.set('1,2', true);
currentGeneration.set('5,2', true);

createNextGeneration(currentGeneration);

//create next generation
// export const nextGeneration = (gen) => {
// 	const generation = new Map();

// 	// i=1 and j=1 are because first and last row and last column are seen as the do not exist
// 	for (let i = 1; i < grid[0] - 1; i++) {
// 		for (let j = 1; j < grid[1] - 1; j++) {
// 			newGen[i][j] = checkNeighbours(gen, i, j);
// 		}
// 	}

// 	return newGen;
// };
