import React from 'react';

const Grid = (props) => {
	//show selected seeds for generation 0
	const onClickHandler = (event, key) => {
		props.loadSeeds(key);

		event.target.className =
			event.target.className === 'squere-dead' ? 'squere-alive' : 'squere-dead';
	};

	return (
		<div className='grid'>
			{props.grid.map((fel, i) => {
				//only render cells in given grid
				const outsideRow =
					i >= props.bonus && i < props.grid.length - props.bonus;

				return (
					outsideRow && (
						<div className='row' key={`row-${i}`}>
							{fel.map((sel, j) => {
								//only render cells in given grid
								const outsideColumn =
									j >= props.bonus && j < fel.length - props.bonus;

								const className = sel ? 'squere-alive' : 'squere-dead';
								return (
									outsideColumn && (
										<div
											className={className}
											key={`row-${i} column-${j}`}
											onClick={(event) => onClickHandler(event, `${i},${j}`)}
										></div>
									)
								);
							})}
						</div>
					)
				);
			})}
		</div>
	);
};

export default Grid;
