import axios from 'axios';
import React, { useState } from  'react';
import { Link, useHistory } from 'react-router-dom'

import './Navbar.css';

const Navbar = () => {

    const [ s, setS ] = useState('');

    let history = useHistory();

    const getSearch = (e) => {
        history.replace(`/search/${s}`);
        e.preventDefault();
    }
    
    return(
        <section id="header">
            <div className="container container-fluid">
                <nav className="navbar navbar-expand-lg" >
                    <a className="navbar-brand" href="#">LOGO</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">                            
                            <Link className="nav-link" to="/" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add">Cadastrar</Link>
                        </li>
                        </ul>
                        <form className="form-inline form-search" onSubmit={ getSearch }>
                            <input className="form-control mr-sm-2" onChange={ (e) => setS(e.target.value) } value={s} type="search" placeholder="Search" />
                            <button className="btn my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </div>                    
                </nav>
            </div>
        </section>        
    )
}

export default Navbar;