import React, {useState, useEffect} from 'react';
import Header from './Header';
import '../Styles/Comp-CRUD.css';
import '../Styles/Modal.css';
import Botao from './Botao';
import { Button} from 'react-bootstrap'; 
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

function Autor(){
    const [autores, setAutores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalAtualiza, setShowModalAtualiza] = useState(false);
    const [nome, setNome] = useState('');
    const [atualizar, setAtualizar] = useState({
        idAutor: '',
        nmAutor: ''
    });

    useEffect(() => {
        getAutores();
    }, []);

    /* Verificar se var está de fato alterando
    useEffect(() => {
        console.log(showModalAtualiza);
    }, [showModalAtualiza]); */

    const getAutores = () => {
        fetch('/autores')
            .then(response => response.json())
            .then(data => setAutores(data));
    }

    const deleteAutores = async(id) => {
        fetch(`/autores/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            getAutores();
        }).catch(() => {
            toast.warn('O autor possui livros cadastrados!', {position: toast.POSITION.TOP_CENTER, autoClose: 3000});
        })
    }

    const atualizaAutores = async(id) => {
        setShowModalAtualiza(true);
        let autorUpdate = [...autores].find(i => i.idAutor === id);
        setNome(autorUpdate.nmAutor);
        setAtualizar(autorUpdate);
    }

    const updateAutores = async() => {
        atualizar.nmAutor = nome;
        await fetch("/autores/", {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atualizar),          
        }).then(() => {
            setShowModalAtualiza(false);
            getAutores();
            atualizar.idAutor = '';
            atualizar.nmAutor = '';
        })
    }

    const corpoTabelaAutores = autores.map(autor => {
        return(
            <tr key = {autor.idAutor}>
                <td> {autor.idAutor}</td>
                <td> {autor.nmAutor}</td>
                <td>
                    <Button className = "buttonAlterar" onClick = {() => atualizaAutores(autor.idAutor)}>Alterar</Button>{' '}
                    <Button className = "buttonExcluir" onClick = {() => deleteAutores(autor.idAutor)}>Excluir</Button>
                </td>
            </tr>  
        )
    });
 
    const recuperaNome = (event) => {
        setNome(event.target.value);
    }

    const modalCadastro = () => (
        <div className = "Modal">
            <form className = "SubModal">
                <h3>Cadastrar Autor(a)</h3>
                <label>
                    Nome
                    <br/>
                    <input type = "text" name = "nome" onChange  = {recuperaNome}/>
                </label>
                <br/>
                <div className = "butoesModal">
                    <Button className = "buttonExcluir" onClick = {() => setShowModal(false)}>Cancelar</Button>
                    <Button className = "buttonCadastrar" onClick = {() => insertAutor()}>Salvar</Button>
                </div>
            </form>
        </div>
    )

    const modalAtualiza = () => (
        <div className = "Modal">
            <form className = "SubModal">
                <h3>Atualizar Autor(a)</h3>
                <label>
                    Nome
                    <br/>
                    <input value = {nome} type = "text" name = "nome" onChange  = {recuperaNome}/>
                </label>
                <br/>
                <div className = "butoesModal">
                    <Button className = "buttonExcluir" onClick = {() => setShowModalAtualiza(false)}>Cancelar</Button>
                    <Button className = "buttonCadastrar" onClick = {() => updateAutores()}>Salvar</Button>
                </div>
            </form>
        </div>
    )

    const insertAutor = () => {
        fetch("/autores" , {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idAutor: '',
                nmAutor: nome
            }),
        }).then(() => {
            setShowModal(false);
            getAutores();
        })
    }

    return(
        <div>
            <Header titulo = "Gerenciar Autores(as)"/>
            <div className = "Comp-CRUD">
                <div className = "Botoes">
                    <Botao titulo = "Home" link = "/"/>
                    <Botao titulo = "Livros" link = "/livros"/>
                </div>
                <div className = "Crud-Table">
                    <div className = "tituloTabela"><h3>Autores</h3></div>
                    <div className = "corpoTabela">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>        
                            <tbody>
                                {corpoTabelaAutores}
                            </tbody>
                        </table>
                    </div>
                    <Button id = "btnA" className = "buttonCadastrar" onClick = {() => setShowModal(true)}>Cadastrar</Button>
                </div>
            </div>
            {showModal ? modalCadastro(): null}
            {showModalAtualiza ? modalAtualiza(): null}
        </div>
    )
}


export default Autor;