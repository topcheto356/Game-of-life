import { Fragment, useState } from 'react';
import './App.css';
import Naviagation from './components/Navigatiom';
import SelectGrid from './components/SelectGrid';
import Grid from './components/Grid';
import { createGeneration0, make2DArray, nextGeneration } from './script';

function App() {
	const [showF, setShowForm] = useState(false);
	const [showSe, setShowSeed] = useState(false);

	const [getGrid, setGetGrid] = useState();
	const [seeds, setSeeds] = useState([]);
	const [gridSize, setGridSize] = useState();

	const bonus = 10;

	const reset = () => {
		setShowSeed(false);
		setGetGrid();
		setSeeds([]);
		setGridSize();
	};

	const showForm = (show) => {
		show ? setShowForm(false) : setShowForm(true);
	};

	const showSeeds = (show) => {
		show ? setShowSeed(true) : setShowSeed(false);
	};

	const loadGrid = (size) => {
		setGridSize([Number(size[0]) + bonus * 2, Number(size[1]) + bonus * 2]);
		setGetGrid(
			make2DArray([Number(size[0]) + bonus * 2, Number(size[1]) + bonus * 2])
		);
	};

	const loadSeeds = (key) => {
		let newSeeds = [...seeds];
		const index = newSeeds.indexOf(key);

		if (index >= 0) {
			newSeeds.splice(index, 1);
		} else newSeeds.push(key);

		setSeeds(newSeeds);
	};

	const loadGerneration0 = () => {
		setGetGrid(createGeneration0(gridSize, seeds));
	};

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
