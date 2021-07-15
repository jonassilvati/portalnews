import React, { useState, useEffect }  from 'react';
import AppContainer from '../AppContainer';
import api from '../../api';
import { Link } from 'react-router-dom';
import './Categorias.css';
import { toast, ToastContainer } from 'react-toastify';

const Categorias = () => {

    const [categories, setCategories] = useState(null);

    const fetchCategories = () => {
        api.getAllCategories().then(res => {
            setCategories(res.data.data);
            console.log(categories);
        })
    }

    useEffect(()=>{
        fetchCategories();
    },[])

    const deleteCategory = async (id) => {        
        try{
            await api.deleteCategory(id).then(res => {
                toast.dark(res.data.data, {
                    autoClose: 500,
                    onClose: () => {
                        fetchCategories();
                    }
                })
            })
        } catch {
            toast('Erro ao excluir categoria');
        }
    }
    
    return(
        <AppContainer
            title="Categorias"
            >
            <ToastContainer position="top-right" />
            <div 
                className="" 
                style={{ padding:'10px 0', display: "flex", justifyContent: "flex-end" }}
                >
                <Link className="btn btn-primary" to="/category/add" >Cadastrar Categorias</Link>
            </div>
            <ul className="list-group">
            {categories &&
                categories.map( (cat) => {
                    return <li className="list-group-item" key={cat.id}>
                        <span><strong>#{cat.id}</strong> - {cat.name}</span>
                        <span className="actions">
                            <Link to={`/category/${cat.id}/edit`} className="btn btn-warning" title="editar"><i className="fas fa-edit"></i></Link>
                            <button onClick={ () => deleteCategory(cat.id) } style={{marginLeft: "10px"}} className="btn btn-danger" title="apagar"><i className="fas fa-trash"></i></button>
                        </span>
                    </li>
                })   
            }
            </ul>

        </AppContainer>
    )
}

export default Categorias;