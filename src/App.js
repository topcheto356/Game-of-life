import { Fragment, useState } from 'react';
import './App.css';
import Naviagation from './components/Navigatiom';
import SelectGrid from './components/SelectGrid';
import Grid from './components/Grid';
import { createGeneration0, make2DArray, nextGeneration } from './gameOfLife';

function App() {
	//Form state (visible or not)
	const [showF, setShowForm] = useState(false);
	//Button to confirm seeds state (visible or not)
	const [showSe, setShowSeed] = useState(false);

	//Current generation state
	const [getGrid, setGetGrid] = useState();
	//Seeds (alive cells from the beggining)
	const [seeds, setSeeds] = useState([]);
	//Grid size
	const [gridSize, setGridSize] = useState();

	//cells that are not rendered on the screen, but are in current generation
	const bonus = 3;

	//reset the game
	const reset = () => {
		setShowSeed(false);
		setGetGrid();
		setSeeds([]);
		setGridSize();
	};

	//show form
	const showForm = (show) => {
		show ? setShowForm(false) : setShowForm(true);
	};

	//show confirm seeds button
	const showSeeds = (show) => {
		show ? setShowSeed(true) : setShowSeed(false);
	};

	//show selected grid size
	const loadGrid = (size) => {
		//update grid size
		setGridSize([Number(size[0]) + bonus * 2, Number(size[1]) + bonus * 2]);

		//update grid state before generation 0
		setGetGrid(
			make2DArray([Number(size[0]) + bonus * 2, Number(size[1]) + bonus * 2])
		);
	};

	//select starting seeds
	const loadSeeds = (key) => {
		//get selected seeds
		let newSeeds = [...seeds];

		//get index of selected seed from seeds if its there
		const index = newSeeds.indexOf(key);

		if (index >= 0) {
			//if its in selected => remove from selected
			newSeeds.splice(index, 1);

			//if its Not in selected => add to selected
		} else newSeeds.push(key);

		//update seeds
		setSeeds(newSeeds);
	};

	//render generation 0
	const loadGerneration0 = () => {
		setShowSeed(false);
		setGetGrid(createGeneration0(gridSize, seeds));
	};

	//render next generation
	const start = () => {
		setGetGrid(nextGeneration(gridSize, getGrid));
	};

	return (
		<Fragment>
			<Naviagation
				showForm={showForm}
				loadGerneration0={loadGerneration0}
				start={start}
				showSe={showSe}
				reset={reset}
			/>
			{showF && (
				<SelectGrid
					showForm={showForm}
					loadGrid={loadGrid}
					showSeeds={showSeeds}
				/>
			)}
			{getGrid && <Grid grid={getGrid} loadSeeds={loadSeeds} bonus={bonus} />}
		</Fragment>
	);
}

export default App;
