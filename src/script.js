//create grid
export const make2DArray = (grid, given) => {
	const gen = new Array(grid[0]);

	// Loop to create 2D array using 1D array
	for (let i = 0; i < grid[0]; i++) {
		gen[i] = new Array(grid[1]);
	}

	// Loop to initialize 2D array elements.
	for (let i = 0; i < grid[0]; i++) {
		for (let j = 0; j < grid[1]; j++) {
			gen[i][j] = given ? given[i][j] : 0;
		}
	}

	return gen;
};

//create generation 0
export const createGeneration0 = (grid, live) => {
	const newGen = make2DArray(grid);

	for (let i = 0; i < grid[0]; i++) {
		for (let j = 0; j < grid[1]; j++) {
			let cell = 0;

			//chekcs cell is alive in gen 0
			live.forEach((el) => {
				if (el === `${i},${j}`) cell = 1;
			});
			newGen[i][j] = cell;
		}
	}

	return newGen;
};

//check if the cell will be dead or alive
const checkNeighbours = (gen, i, j) => {
	let cell = 0;

	for (let a = 0; a < 3; a++) {
		for (let b = 0; b < 3; b++) {
			cell += gen[a + i - 1][b + j - 1];
		}
	}

	let result = 0;

	//if watching cell is alive
	if (gen[i][j] === 1) {
		//cell includes and watching cell
		switch (cell - 1) {
			case 2:
				result = 1;
				break;
			case 3:
				result = 1;
				break;
			default:
				result = 0;
		}

		//if watching cell is dead
	} else {
		if (cell === 3) result = 1;
		else result = 0;
	}

	return result;
};

//create next generation
export const nextGeneration = (grid, gen) => {
	const newGen = make2DArray(grid, gen);

	// i=1 and j=1 are because first and last row and last column are seen as the do not exist
	for (let i = 1; i < grid[0] - 1; i++) {
		for (let j = 1; j < grid[1] - 1; j++) {
			newGen[i][j] = checkNeighbours(gen, i, j);
		}
	}

	return newGen;
};
