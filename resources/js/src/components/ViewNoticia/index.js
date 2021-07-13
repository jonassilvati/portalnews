import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useParams, Link, useHistory } from 'react-router-dom';

import AppContainer from '../AppContainer';
import './ViewNoticia.css';

import api from '../../api';


const ViewNoticia = () => {

    const {id} = useParams();

    const [title, setTitle] = useState('Título aqui');

    let history = useHistory();
    
    useEffect(()=>{
        api.getNews(id).then(res => {
           setTitle(res.data.data.title);                      
           document.getElementById('html-result').innerHTML =  res.data.data.content;
        })
    },[]);    

    const deleteItem = () => {
        if(confirm('Deseja realmente apagar a notícia?')){
            api.deleteNews(id).then(res => {
                toast.dark(res.data.data, {
                    onClose : () =>  history.push('/'),
                    autoClose: 1500
                })
            });
        }
        
    }

    return(
        <AppContainer
            title={ title }
        >
            <div className="container-text-news">                
                <span id="html-result">Informe-se</span>      
            </div>
            <ToastContainer/>
            <div className="dash-edit">
                <hr></hr>
                <div style={{marginTop:'10px'}} >
                    <Link to={`/noticia/${id}/edit`} className="btn btn-warning"><i className="fas fa-edit"></i> Editar</Link>
                    <button onClick={deleteItem} style={{marginLeft:'10px'}} className="btn btn-danger"><i className="fas fa-trash"></i> Apagar</button>
                </div>
            </div>
        </AppContainer>
    )
}

export default ViewNoticia;