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
import AddCategory from './components/AddCategory';
import Categorias from './components/Categories';

import ViewNoticia from './components/ViewNoticia';

import './App.css';
import EditCategory from './components/EditCategory';
import ByCategory from './components/ByCategory';

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
                <Route exact path="/news/:id">
                    <ViewNoticia />
                </Route>
                <Route path="/news/:id/edit">
                    <Edit/>
                </Route>
                <Route path="/search/:s">
                    <Search/>
                </Route>
                <Route exact path="/category">
                    <Categorias/>
                </Route>
                <Route path="/category/add">
                    <AddCategory/>
                </Route>
                <Route path="/category/:id/edit">
                    <EditCategory/>
                </Route>
                <Route path="/bycategory/:id">
                    <ByCategory/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));