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

const loopThroughNeighbours = (cords, neededAction) => {
	const row = Number(cords.split(',')[0]);
	const column = Number(cords.split(',')[1]);

	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = column - 1; j <= column + 1; j++) {
			neededAction(i, j);
		}
	}
};

const getAliveNeighbours = (cords, generation) => {
	let aliveCells = 0;

	const neededAction = (row, column) => {
		if (generation.has(`${row},${column}`)) {
			aliveCells++;
		}
	};

	loopThroughNeighbours(cords, neededAction);

	return aliveCells;
};

const checkDeadCell = (
	cords,
	currentGeneration,
	newGeneration,
	checkedDeadCells
) => {
	let aliveNeighbours = 0;

	const neededAction = (row, column) => {
		if (!currentGeneration.has(`${row},${column}`)) {
			if (!checkedDeadCells.has(`${row},${column}`)) {
				aliveNeighbours = getAliveNeighbours(
					`${row},${column}`,
					currentGeneration
				);

				//not to check same dead cell again
				checkedDeadCells.set(`${row},${column}`, true);

				if (aliveNeighbours === 3) {
					newGeneration.set(`${row},${column}`, true);
				}
			}
		}
	};

	loopThroughNeighbours(cords, neededAction);
};

const checkCellForNextGeneration = (
	cords,
	currentGeneration,
	newGeneration,
	checkedDeadCells
) => {
	//check alive cell
	const aliveNeighbours = getAliveNeighbours(cords, currentGeneration) - 1;
	if (aliveNeighbours < 2 || aliveNeighbours > 3) {
		newGeneration.delete(cords);
	}

	// check dead cells around alive cell
	checkDeadCell(cords, currentGeneration, newGeneration, checkedDeadCells);
};

export const createNextGeneration = (generation) => {
	const checkedDeadCells = new Map();
	const newGeneration = new Map(
		JSON.parse(JSON.stringify(Array.from(generation)))
	);

	generation.forEach((value, cords, gen) => {
		checkCellForNextGeneration(cords, gen, newGeneration, checkedDeadCells);
	});

	checkedDeadCells.clear();
	return newGeneration;
};
