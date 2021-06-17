import React, { Component} from 'react';
import Header from './Header';
import '../Styles/Comp-CRUD.css';
import Botao from './Botao';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Autor extends Component{
    constructor(props){
        super(props);
        this.state = {autores: []};
    }

    componentDidMount(){
        fetch('/autores')
            .then(response => response.json())
            .then(data => this.setState({autores:data}));
    }

    async remove(id){
        await fetch(`/autores/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updateAutores = [...this.state.autores].filter(i => i.idAutor !== id);
            this.setState({autores:updateAutores})
        })
    }

    render(){
        const {autores} = this.state;

        const todosAutores = autores.map(autor => {
            return(
                <tr key = {autor.idAutor}>
                    <td> {autor.idAutor}</td>
                    <td> {autor.nmAutor}</td>
                    <td>
                        <Button className = "buttonAlterar" tag = {Link} to = {"/autores/" + autor.idAutor}>Alterar</Button>{' '}
                        <Button className = "buttonExcluir" onClick = {() => this.remove(autor.idAutor)}>Excluir</Button>
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
                        <Button className = "buttonCadastrar" tag = {Link} to = "/autores/novo">Cadastrar</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Autor;