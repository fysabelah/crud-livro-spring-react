import React, {useState} from 'react';
import Header from './Header';
import '../Styles/Comp-CRUD.css';
import Botao from './Botao';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Autor(){
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        recuperaAutores();
    }, []);

    const recuperaAutores = () => {
        fetch('/autores')
            .then(response => response.json())
            .then(data => setAutores(data));
    }

    const removeAutores = async(id) => {
        await fetch(`/autores/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            recuperaAutores();
        })
    }


    const atualizaAutores = async(id) => {
        let autorUpdate = [...autores].filter(i => i.idAutor == id);

        /*Pegar dados do autor e inserir no input*/
    }

    const cadastraAutor = () => {

    }

    const todosAutores = autores.map(autor => {
        return(
            <tr key = {autor.idAutor}>
                <td> {autor.idAutor}</td>
                <td> {autor.nmAutor}</td>
                <td>
                    <Button className = "buttonAlterar" onClick = {() => atualizaAutores(autor.idAutor)}>Alterar</Button>{' '}
                    <Button className = "buttonExcluir" onClick = {() => removeAutores(autor.idAutor)}>Excluir</Button>
                </td>
            </tr>  
        )
    });

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
                                {todosAutores}
                            </tbody>
                        </table>
                    </div>
                    <Button className = "buttonCadastrar">Cadastrar</Button>
                </div>
            </div>

        </div>
    )
}


export default Autor;