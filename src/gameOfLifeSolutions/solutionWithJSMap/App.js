import { Fragment, useState } from 'react';
import './App.css';
import Naviagation from './components/Navigatiom';
import SelectGrid from './components/SelectGrid';
import Grid from './components/Grid';
import { createNextGeneration } from './gameOfLife';

function App() {
	//Form state (visible or not)
	const [showF, setShowForm] = useState(false);
	//Button for the next generation
	const [showNext, setShowNext] = useState(false);

	//Current generation state
	const [generation, setGeneration] = useState(new Map());
	//Grid size
	const [gridSize, setGridSize] = useState();

	//reset the game
	const reset = () => {
		setShowNext(false);
		setGeneration(new Map());
	};

	//show form
	const showForm = (show) => {
		show ? setShowForm(false) : setShowForm(true);
	};

	//show next generation button
	const showNextGenerationButton = (show) => {
		show ? setShowNext(true) : setShowNext(false);
	};

	//set grid size
	const loadGrid = (size) => {
		setGridSize(size);
	};

	//select generation 0
	const selectGeneraion0 = (cords) => {
		if (generation.get(cords)) {
			generation.delete(cords);
		} else {
			generation.set(cords, true);
		}
	};

	//render next generation
	const loadNextGerneration = () => {
		setGeneration(createNextGeneration(generation));
	};

	return (
		<Fragment>
			<Naviagation
				showForm={showForm}
				loadNextGerneration={loadNextGerneration}
				showNext={showNext}
				reset={reset}
			/>
			{showF && (
				<SelectGrid
					showForm={showForm}
					loadGrid={loadGrid}
					showNextGenerationButton={showNextGenerationButton}
				/>
			)}
			{generation && (
				<Grid
					generation={generation}
					gridSize={gridSize}
					selectGeneraion0={selectGeneraion0}
				/>
			)}
		</Fragment>
	);
}

export default App;
