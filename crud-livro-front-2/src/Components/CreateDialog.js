import { Component } from "react";
import reactDom from "react-dom";

class CreateDialog extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const novoCadastro = {};

        this.props.atributos.forEach(atributo => {
            novoCadastro[atributo] = reactDom.findDOMNode(this.refs[atributo]).value.trim();
        });

        this.props.onCreate(novoCadastro);

        this.props.atributos.forEach(atributo => {
            reactDom.findDOMNode(this.refs[atributo]).value = '';
        });

        window.location = "#";

    }
    
    render(){
        const inputs = this.props.atributos.map(atributo => 
            <p key = {atributo}>
                <input type = "text" placeholder = {atributo} ref = {atributo} className = "field"/>
            </p>  
        );

        return(
            <div>
                <a href = "#criarAutor">Cadastrar</a>
                <div id = "criarAutor" className = "modalDialog">
                    <div>
                        <a href = "#" title = "Close" className = "close">X</a>
                        <h2>Cadastrar novo Autor</h2>
                        <form>
                            {inputs}
                            <button onClick = {this.handleSubmit}>Cadastrar</button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateDialog;