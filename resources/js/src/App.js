import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';


import Home from './components/Home';
import Add from './components/Add';
import Edit  from './components/Edit';
import Search from './components/Search';

import ViewNoticia from './components/ViewNoticia';

import './App.css';

const App = () => {

    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/add">
                    <Add/>
                </Route>
                <Route exact path="/noticia/:id">
                    <ViewNoticia />
                </Route>
                <Route path="/noticia/:id/edit">
                    <Edit/>
                </Route>
                <Route path="/search/:s">
                    <Search/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));