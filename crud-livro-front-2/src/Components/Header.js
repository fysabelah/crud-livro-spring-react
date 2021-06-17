import React from 'react';
import '../Styles/Header.css'

function Header(props){
    return(
        <header className="Header">
            <div>
                <h1>{props.titulo}</h1>
            </div>
        </header>
    );
}

export default Header;