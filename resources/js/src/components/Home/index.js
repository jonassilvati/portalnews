import React, { useEffect, useState } from 'react';  
import AppContainer from '../AppContainer';
import Noticia from '../Noticia';
import api from '../../api'; 

import './Home.css';

const Home = () => {

    const [news, setNews] = useState(null);

    useEffect(() => {
        api.getAllNews().then((res) => {
            setNews(res.data.data);
            console.log(news);
        })
    },[]);

    

    return(
        <AppContainer
            title="Notícias"
        >
            <div className="grid-noticias">
                {(news && news.length > 0) ? news.map((n)=>(
                    <Noticia key={n.id} id={n.id} title={n.title} content={n.content} />
                )) : <p>Carregando dados...</p>
            
                }
            </div>
        </AppContainer>
    )
}

export default Home;