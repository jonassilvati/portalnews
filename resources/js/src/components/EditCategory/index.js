import React, { useEffect, useState } from 'react';
import api from '../../api';
import { toast, ToastContainer } from 'react-toastify';
import AppContainer from '../AppContainer';
import { useHistory, useParams } from 'react-router-dom';

const EditCategory = () => {
    
    const [name, setName] = useState('Nome aqui');
    const { id } = useParams();

    let history = useHistory();

    useEffect(()=>{
        api.getCategory(id).then(res => {
            setName(res.data.data.name);
        })
    },[]);

    const editCategory = async (e) => {
        e.preventDefault();
        try{
            await api.updateCategory({name:name}, id).then(res => {
                toast.dark( res.data.data, {
                    autoClose: 1000,
                    onClose: () => {
                        history.push('/category');
                    }
                })
            })
        } catch {
            toast('Erro salvar categoria')
        }
    }

    return(
        <AppContainer
            title={`Editando: #${id}`}
            >
            <ToastContainer position="top-right"/>
            <form onSubmit={editCategory}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input name="name" id="name" type="text" className="form-control" value={ name } onChange={ (e) => setName(e.target.value) }/>                    
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="salvar"/>
                </div>
            </form>
        </AppContainer>
    )
}

export default EditCategory;