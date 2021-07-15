import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, useHistory } from 'react-router-dom';

import AppContainer from '../AppContainer';
import { Editor } from '@tinymce/tinymce-react';
import api from '../../api';


const Add = () => {

    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);

    const editorRef = useRef(null);  

    let history = useHistory();
    
    const addNews = async (e) => {
        e.preventDefault();
        try{
            await api.addNews({title: title, category: category, content: editorRef.current.getContent()}).then(res => {
                toast.dark(res.data.data, {
                    onClose: () => history.push('/'),
                    autoClose: 1500
                });
            });
        }catch{
            toast('Falha ao salvar notícia');
        }
    }

    useEffect(()=>{
        api.getAllCategories().then(res => {
            setCategories(res.data.data);
            console.log(categories);
        })
    },[])


    return(
        <AppContainer
            title="Cadastrar notícia"
            >
            <ToastContainer position="top-right"
                 
                />
            <form
                onSubmit={addNews}
            >
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input className="form-control" 
                        name="title" 
                        placeholder="Título de sua notícia"
                        id="title" 
                        onChange={ (e) => setTitle(e.target.value) } 
                        value={title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Categoria</label>
                    <select class="form-control" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>Selecione uma categoria</option>
                        {categories &&
                            
                            categories.map((cat) => {
                                return <option value={cat.id}>{cat.name}</option>
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
                        initialValue=""
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
                    <input className="btn btn-primary" type="submit" value="cadastrar" />
                    <Link to="/" style={{marginLeft:'10px'}} className="btn btn-dark" >Voltar</Link>
                </div>
            </form>
        </AppContainer>
    )
}

export default Add;