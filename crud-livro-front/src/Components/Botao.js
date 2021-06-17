import React from 'react';
import {Link} from 'react-router-dom';
import '../Styles/Botao.css';

function Botao({link, titulo}){
    return(
        <Link to = {link}> 
            <div className = "Botao">
                <h4>{titulo}</h4>
            </div>
        </Link>
    )
}

export default Botao;