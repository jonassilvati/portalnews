import React, { useEffect, useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useParams, Link, useHistory } from 'react-router-dom';


import api from '../../api';
import AppContainer from '../AppContainer';

const Edit = () => {
    
    const { id } = useParams();

    //referencia do editor de texto
    const editorRef = useRef(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    
    useEffect(()=>{
        api.getNews(id).then(res => {
            setTitle(res.data.data.title);       
            setContent(res.data.data.content);
            setCategory(res.data.data.category);
        });

        api.getAllCategories().then(res => {
            setCategories(res.data.data);
            console.log(categories);
        })
    },[]);
   
    let history = useHistory();

    const updateNews = async (e) => {
        e.preventDefault();
        try{
            await api.updateNews({title, category, content}, id).then(res => {
                toast.dark(res.data.data, {
                    onClose: () => history.push(`/news/${id}`) 
                });
            })
        }catch{
            toast('Erro ao atualizar notícia');
        }       
        
    }

    return(
        <AppContainer
            title={`Editar: ${title}`}
        >
            <ToastContainer position="top-right"
            autoClose={1500}
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
                <label htmlFor="category">Categoria</label>
                    <select className="form-control" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option key="0" value="0">Selecione uma categoria</option>
                        {categories &&
                            
                            categories.map((cat) => {
                                return <option key={cat.id} value={cat.id}>{cat.name}</option>
                            })

                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Conteúdo</label>
                    <Editor
                        apiKey="g6lpy6g8qsxfauzvliy002ycx0v9el1ta99p0fx86a5dvhx0"
                        className="form-control"
                        id="content"
                        onInit={(evt, editor) => editorRef.current = editor}
                        value={ content }
                        onEditorChange={ () => setContent(editorRef.current.getContent()) }
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
    )
}

export default Edit;
