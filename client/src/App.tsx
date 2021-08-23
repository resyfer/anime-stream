//* React
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//* CSS
import './App.scss';

//* Pages
import Home from './pages/Home';
import Error404 from './pages/Error404';

//* Components
import Navbar from './components/Navbar';

//* Function Component
const App: React.FC = () => {
	return (
		<div className='App'>
			<Router>
				<Navbar />

				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>

					<Route path='/'>
						<Error404 />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

//* Export
export default App;
