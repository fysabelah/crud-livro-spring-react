import React, {useState} from 'react';
import Header from './Header';
import '../Styles/Botao.css';
import '../Styles/Comp-CRUD.css';
import Botao from './Botao';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Livro(){
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        recuperaLivros();;
    }, []);

    const recuperaLivros = () => {
        fetch('/livros')
            .then(response => response.json())
            .then(data => setLivros(data));
    }

    const removeLivros = async(id) => {
        await fetch(`/livros/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            recuperaLivros();
        })
    }

    const todosLivros = livros.map(livro => {
        return(
            <tr key = {livro.idLivro}>
                <td>{livro.idLivro}</td>
                <td>{livro.tituloLivro}</td>
                <td>{livro.autor.nmAutor}</td>
                <td>
                    <Button className = "buttonAlterar" tag = {Link} to = {"/livros/" + livro.idLivro}>Alterar</Button>{' '}
                    <Button className = "buttonExcluir" onClick = {() => removeLivros(livro.idLivro)}>Excluir</Button>
                </td>
            </tr>
        )
    })

    return(
        <div>
            <Header titulo = "Gerenciar Livros"/>
            <div className = "Comp-CRUD">
                <div className = "Botoes">
                    <Botao titulo = "Home" link = "/"/>
                    <Botao titulo = "Autores(as)" link = "/autores"/>
                </div>
                <div className = "Crud-Table">
                    <div className = "tituloTabela"><h3>Livros</h3></div>
                    <div className = "corpoTabela">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Nome do Autor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>        
                            <tbody>
                                {todosLivros}
                            </tbody>
                        </table>
                    </div>
                    <Button className = "buttonCadastrar">Cadastrar</Button>
                </div>
            </div>
        </div>
    )
}

export default Livro;