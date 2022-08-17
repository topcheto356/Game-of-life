import React from 'react';

const Naviagation = (props) => {
	//remove the for after the grid is selected
	const onClickGridHandler = () => {
		props.showForm(true);
		props.reset();
	};

	//render generation 0
	const onClickNext = () => {
		props.loadNextGerneration();
	};

	return (
		<nav className='navigation'>
			<ul className='list'>
				<li onClick={onClickGridHandler}>Create grid</li>
				{props.showNext && <li onClick={onClickNext}>Next generation</li>}
			</ul>
		</nav>
	);
};

export default Naviagation;
