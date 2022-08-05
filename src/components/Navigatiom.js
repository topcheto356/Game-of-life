import React, { useState } from 'react';

const Naviagation = (props) => {
	const [showSt, setShowSt] = useState(false);

	const onClickGridHandler = () => {
		props.showForm(false);
		setShowSt(false);

		props.reset();
	};

	const onClickSeedsHandler = () => {
		props.loadGerneration0();
		setShowSt(true);
	};

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
				{showSt && <li onClick={onClickStartHandler}>Start</li>}
			</ul>
		</nav>
	);
};

export default Naviagation;
