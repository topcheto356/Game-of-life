import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './gameOfLifeSolutions/solutionWith2DArray/App';
import App from './gameOfLifeSolutions/solutionWithJSMap/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
