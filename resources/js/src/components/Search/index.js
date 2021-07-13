import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useParams } from 'react-router';
import AppContainer from '../AppContainer';
import Noticia from '../Noticia';


const Search = () => {
    
    const { s } = useParams();

    const [news, setNews] = useState(null);
    const [qtd, setQtd] = useState(0);

    useEffect(()=>{
        api.searchNews(s).then(res => {
            setNews(res.data.data);
            setQtd(res.data.data.length);
        })
    },[]);

    return(
        <AppContainer
            title={`Resultados para a pesquisa: ${s} (${qtd})`}
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

export default Search;