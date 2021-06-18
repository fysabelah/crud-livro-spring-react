import React, {useState} from 'react';
import Header from './Header';
import '../Styles/Botao.css';
import '../Styles/Comp-CRUD.css';
import Botao from './Botao';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../Styles/Modal.css';

function Livro(){
    const [livros, setLivros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [idAutor, setIdAutor] = useState('');
    const [titulo, setTitulo] = useState('');
    const [showModalCadastro, setShowModalCadastro] = useState(false);

    useEffect(() => {
        getLivros();
        getAutores();
    }, []);

    const getAutores = () => {
        fetch('/autores')
            .then(response => response.json())
            .then(data => setAutores(data));
    }

    const getLivros = () => {
        fetch('/livros')
            .then(response => response.json())
            .then(data => setLivros(data));
    }

    const deleteLivros = async(id) => {
        await fetch(`/livros/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            getLivros();
        })
    }

    const recuperaTitulo = (event) => {
        setTitulo(event.target.value);
    }

    const insertLivro = () => {
        fetch("livros", {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        }).then(() => {
            setShowModalCadastro(false);
            getLivros();
        })
    }

    const modalCadastro = () => (
        <div className = "Modal">
            <form className = "SubModalAutor">
                <h3>Cadastrar Livro</h3>
                <label>
                    Título
                    <br/>
                    <input type = "text" name = "titulo" onChange  = {recuperaTitulo}/>
                </label>
                <br/>
                <label>
                    Escolha o Autor
                    <br/>
                    <select value = {idAutor} onChange = {e => setIdAutor(e.target.value)}>
                        {autores.map((autor) => 
                            <option value = {autor.idAutor} key = {autor.idAutor}>{autor.nmAutor}</option>
                        )}    
                    </select>
                </label>
                <br/>
                <div className = "butoesModal">
                    <Button className = "buttonExcluir" onClick = {() => setShowModalCadastro(false)}>Cancelar</Button>
                    <Button className = "buttonCadastrar" onClick = {() => insertLivro()}>Salvar</Button>
                </div>
            </form>
        </div>
    )

    const corpoTabelaAutores = livros.map(livro => {
        return(
            <tr key = {livro.idLivro}>
                <td>{livro.idLivro}</td>
                <td>{livro.tituloLivro}</td>
                <td>{livro.autor.nmAutor}</td>
                <td>
                    <Button className = "buttonAlterar" tag = {Link} to = {"/livros/" + livro.idLivro}>Alterar</Button>{' '}
                    <Button className = "buttonExcluir" onClick = {() => deleteLivros(livro.idLivro)}>Excluir</Button>
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
                                {corpoTabelaAutores}
                            </tbody>
                        </table>
                    </div>
                    <Button className = "buttonCadastrar" onClick = {() => setShowModalCadastro(true)}>Cadastrar</Button>
                </div>
            </div>
            {showModalCadastro ? modalCadastro(): null}
        </div>
    )
}

export default Livro;