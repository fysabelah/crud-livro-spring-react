import React, { Component } from 'react';
import Header from './Header';
import '../Styles/Botao.css';
import '../Styles/Comp-CRUD.css';
import Botao from './Botao';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Livro extends Component{
    constructor(props){
        super(props);
        this.state = {livros: []};
    }

    componentDidMount(){
        fetch('/livros')
            .then(response => response.json())
            .then(data => this.setState({livros: data}));
    }

    async remove(id){
        await fetch(`/livros/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updateLivros = [...this.state.livros].filter(i => i.idLivro !== id);
            this.setState({livros: updateLivros})
        })
    }

    render(){
        const {livros} = this.state;

        const todosLivros = livros.map(livro => {
            return(
                <tr key = {livro.idLivro}>
                    <td>{livro.idLivro}</td>
                    <td>{livro.tituloLivro}</td>
                    <td>{livro.autor.nmAutor}</td>
                    <td>
                        <Button className = "buttonAlterar" tag = {Link} to = {"/livros/" + livro.idLivro}>Alterar</Button>{' '}
                        <Button className = "buttonExcluir" onClick = {() => this.remove(livro.idLivro)}>Excluir</Button>
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
 }

 export default Livro;