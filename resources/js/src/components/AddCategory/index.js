import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AppContainer from '../AppContainer';
import { Link } from 'react-router-dom';

import api from '../../api';

const AddCategory = () => {

    const [name, setName] = useState('');

    const submitCategory = async (e) => {
        e.preventDefault();

        try {
            await api.addCategory({ name: name}).then(res => {
                setName('');
                toast.dark(res.data.data, {
                    autoClose: 1000
                }) 
            })
        } catch {
            toast('Erro ao cadastrar categoria')
        }
    }

    return(
        <AppContainer
            title="Cadastre categorias"
        >
            <ToastContainer position="top-right"/>
            <form onSubmit={submitCategory}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input name="name" id="name" type="text" className="form-control" value={ name } onChange={ (e) => setName(e.target.value) }/>                    
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="salvar"/>
                    <Link style={{marginLeft:"10px"}} to="/category" className="btn btn-dark">voltar</Link>
                </div>
            </form>
        </AppContainer>
    )
}

export default AddCategory;