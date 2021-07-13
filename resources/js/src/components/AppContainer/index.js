import React, { Fragment } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

import './AppContainer.css';

const AppContainer = ({ title, children }) => {
    
    return(
        <Fragment>
        <div id="main">
            <Navbar/>
            <section>
                <div className="container container-fluid">
                <div className="app-title">
                    <h1>{title}</h1>
                </div>
                <div className="container_app">
                    {children}
                </div>
                </div>
            </section>              
        </div>
        <Footer/>
        </Fragment>
    )
}

export default AppContainer;