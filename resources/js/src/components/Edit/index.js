import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useParams, Link, useHistory } from 'react-router-dom';


import api from '../../api';
import AppContainer from '../AppContainer';

const Edit = () => {
    
    const {id} = useParams();

    //referencia do editor de texto
    const editorRef = useRef(null);

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    
    useEffect(()=>{
        api.getNews(id).then(res => {
            setTitle(res.data.data.title);       
            setContent(res.data.data.content);
        })
    },[]);

    const manageContent = () => {
        setContent(editorRef.current.getContent());
        console.log(editorRef.current.getContent());
    }
    

    let history = useHistory();

    const updateNews = async (e) => {
        e.preventDefault();
        try{
            await api.updateNews({title, content}, id).then(res => {
                toast.dark(res.data.data, {
                    onClose: () => history.push(`/noticia/${id}`) 
                });
            })
        }catch{
            toast('Erro ao atualizar notícia');
        }       
        
    }

    return(
        <Fragment>
            {title &&
                <AppContainer
                    title={`Editar: ${title}`}
                >
                   <ToastContainer position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover    
                    />
                    <form
                        onSubmit={updateNews}
                    >
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input className="form-control" 
                                name="title" 
                                placeholder="Título de sua notícia"
                                id="title" 
                                onChange={ (e) => setTitle(e.target.value) } 
                                value={ title }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Conteúdo</label>
                            <Editor
                                apiKey="g6lpy6g8qsxfauzvliy002ycx0v9el1ta99p0fx86a5dvhx0"
                                className="form-control"
                                id="content"
                                onInit={(evt, editor) => editorRef.current = editor}
                                value={ content }
                                onEditorChange={manageContent}
                                init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input className="btn btn-primary" type="submit" value="Salvar" />
                            <Link to="/" style={{marginLeft:'10px'}} className="btn btn-dark" >Voltar</Link>
                        </div>
                    </form> 
                </AppContainer>
            }
        </Fragment>
    )
}

export default Edit;
