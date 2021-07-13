import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Noticia.css';

const Noticia = ({id, title, content}) => {
    
    const[ contentTxt, setContentTxt ] = useState('');

    useEffect(()=>{
        setContentTxt(extractContent(content));
    },[])

    const extractContent = (s) => {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };
    
    return(
        <div className="item-noticia">
            <span className="title-card-news">{ title }</span>
            <span className="content-card-news">{ contentTxt }</span>
            <div className="container-btn-learnmore">
                <Link to={ location => `/noticia/${id}` }>Acessar</Link>
            </div>
        </div>
    )
}

export default Noticia;