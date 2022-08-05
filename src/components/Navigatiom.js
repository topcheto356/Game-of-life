import React from 'react';

const Naviagation = (props) => {
	const onClickGridHandler = () => {
		props.showForm(false);
	};

	const onClickSeedsHandler = () => {
		props.loadGerneration0();
		props.showStart(true);
	};

	const onClickStartHandler = () => {
		props.start();
	};

	return (
		<nav className="navigation">
			<ul className="list">
				<li onClick={onClickGridHandler}>Create grid</li>
				{props.showSe && (
					<li onClick={onClickSeedsHandler}>Confirm selected seeds</li>
				)}
				{props.showSt && <li onClick={onClickStartHandler}>Start</li>}
			</ul>
		</nav>
	);
};

export default Naviagation;
