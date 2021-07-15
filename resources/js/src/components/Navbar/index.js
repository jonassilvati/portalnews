import React, { useEffect, useState } from  'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../api';

import './Navbar.css';

const Navbar = () => {

    const [s, setS] = useState('');
    const [categories, setCategories] = useState([])

    let history = useHistory();

    const getSearch = (e) => {
        history.replace(`/search/${s}`);
        e.preventDefault();
    }

    const breakText = (text, i) => {
        let words = text.split(" ").slice(0, i);
        let last_word = words[words.length - 1];

        
        if(last_word.charAt(last_word.length - 1) != '.' && words.length >= i){
            words.pop();
            words.push( last_word + '...' );
        }    

        return words.join(' ');
    }

    useEffect(()=>{
        api.getAllCategories().then(res => {
            setCategories(res.data.data);
        })
    },[])
    
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Categorias
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categories && 
                                        categories.map((cat) => {
                                            return <Link key={cat.id} to={`/bycategory/${cat.id}`} className="dropdown-item">{ `${breakText(cat.name, 3)}` }</Link>
                                        })
                                    }
                                    <div className="dropdown-divider"></div>
                                    <Link to="/category" className="dropdown-item">Gerenciar</Link>
                                </div>
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