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

	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([]);

	const makeArraysToRenderGrid = (grid) => {
		const row = [];
		const column = [];

		for (let i = 0; i < grid.row; i++) {
			row.push(0);
		}

		for (let i = 0; i < grid.column; i++) {
			column.push(0);
		}
		setRows(row);
		setColumns(column);
	};

	//reset the game
	const reset = () => {
		setShowNext(false);
		setGridSize();
		setGeneration(new Map());
	};

	//show form
	const showForm = (show) => {
		show ? setShowForm(true) : setShowForm(false);
	};

	//show next generation button
	const showNextGenerationButton = (show) => {
		show ? setShowNext(true) : setShowNext(false);
	};

	//set grid size
	const loadGrid = (size) => {
		setGridSize(size);
		makeArraysToRenderGrid(size);
	};

	//select generation 0
	const selectGeneraion0 = (cords) => {
		const generation0 = new Map(
			JSON.parse(JSON.stringify(Array.from(generation)))
		);

		if (generation0.get(cords)) {
			generation0.delete(cords);
		} else {
			generation0.set(cords, true);
		}

		setGeneration(generation0);
	};

	//render next generation
	const loadNextGerneration = () => {
		console.log(generation);
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
			{showF}
			{showF && (
				<SelectGrid
					showForm={showForm}
					loadGrid={loadGrid}
					showNextGenerationButton={showNextGenerationButton}
				/>
			)}

			{gridSize && (
				<Grid
					generation={generation}
					gridSize={gridSize}
					selectGeneraion0={selectGeneraion0}
					rows={rows}
					columns={columns}
				/>
			)}
		</Fragment>
	);
}

export default App;
