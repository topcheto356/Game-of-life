// Solution with Map

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
