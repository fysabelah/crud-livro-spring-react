import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ItemMenu.css';

function ItemMenu({link, titulo}){
    return(
        <Link to = {link}>
            <div className = "Menuh">
                <h2>{titulo}</h2>
            </div>
        </Link>
    )
}

export default ItemMenu;