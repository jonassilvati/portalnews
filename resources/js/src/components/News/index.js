import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './News.css';

const News = ({id, title, content}) => {
    
    const[ contentTxt, setContentTxt ] = useState('');

    useEffect(()=>{
        setContentTxt(extractContent(content));
    },[])

    const extractContent = (s) => {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };

    const breakText = (text, i) => {
        let words = text.split(" ").slice(0, i);
        let last_word = words[words.length - 1];

        
        if(last_word.charAt(last_word.length - 1) != '.' && words.length >= i){
            words.pop();
            words.push( last_word + '...' );
        }    

        return words.join(' ');
    }
    
    return(
        <div className="item-noticia">
            <span className="title-card-news">{ title }</span>
            <span className="content-card-news">{ `${breakText(contentTxt, 30)}` }</span>
            <div className="container-btn-learnmore">
                <Link to={ location => `/news/${id}` }>Acessar</Link>
            </div>
        </div>
    )
}

export default News;