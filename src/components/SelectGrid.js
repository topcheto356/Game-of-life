import React, { useState } from 'react';

const SelectGrid = (props) => {
	const [grid, setGrid] = useState({});

	const enteredHeightHandler = (event) => {
		const height = event.target.value;

		grid.height = height;

		setGrid((prevState) => {
			return { ...prevState, ...grid };
		});
	};

	const enteredWidthHandler = (event) => {
		const width = event.target.value;

		grid.width = width;

		setGrid((prevState) => {
			return { ...prevState, ...grid };
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const size = [grid.height, grid.width];

		props.loadGrid(size);

		props.showForm(true);
		props.showSeeds(true);
	};

	return (
		<div className='form'>
			<form onSubmit={submitHandler}>
				<div className='controls'>
					<div className='control'>
						<label className='label'>Height</label>
						<input
							className='input'
							type={`number`}
							step={1}
							value={grid.height}
							onChange={enteredHeightHandler}
						/>
					</div>
					<div className='control'>
						<label className='label'>Width</label>
						<input
							className='input'
							type={`number`}
							step={1}
							value={grid.width}
							onChange={enteredWidthHandler}
						/>
					</div>
				</div>
				<div className='btn-submit'>
					<button type='submit'>Select grid</button>
				</div>
			</form>
		</div>
	);
};

export default SelectGrid;
