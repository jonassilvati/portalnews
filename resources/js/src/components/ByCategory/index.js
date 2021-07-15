import React, { useEffect, useState } from 'react';
import AppContainer from '../AppContainer';
import api from '../../api';
import { useParams } from 'react-router-dom';
import News from '../News';

const ByCategory = () => {

    const {id} = useParams();
    const [title, setTitle] = useState('Notícias');
    const [news, setNews] = useState();
    
    useEffect(()=>{
        api.getNewsByCategory(id).then(res => {
            setNews(res.data.data)
        })

        api.getCategory(id).then(res => {
            setTitle(`Notícias - ${res.data.data.name}`)
        })
    },[id])

    return(
        <AppContainer
            title={title}
        >
            <div className="grid-noticias">
                {(news && news.length > 0) ? news.map((n)=>(
                    <News key={n.id} id={n.id} title={n.title} content={n.content} />
                )) : <p>Sem notícias...</p>
            
                }
            </div>
        </AppContainer>
    )
}

export default ByCategory;