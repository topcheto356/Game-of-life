import React, { useState } from 'react';

const Naviagation = (props) => {
	//show next generation button state
	const [showSt, setShowSt] = useState(false);

	//remove the for after the grid is selected
	const onClickGridHandler = () => {
		props.showForm(false);

		//reset the game
		setShowSt(false);
		props.reset();
	};

	//render generation 0
	const onClickSeedsHandler = () => {
		props.loadGerneration0();
		setShowSt(true);
	};

	//render next generation
	const onClickStartHandler = () => {
		props.start();
	};

	return (
		<nav className='navigation'>
			<ul className='list'>
				<li onClick={onClickGridHandler}>Create grid</li>
				{props.showSe && (
					<li onClick={onClickSeedsHandler}>Confirm selected seeds</li>
				)}
				{showSt && <li onClick={onClickStartHandler}>Next generation</li>}
			</ul>
		</nav>
	);
};

export default Naviagation;
