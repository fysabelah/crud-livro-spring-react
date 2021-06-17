import React from 'react';
import Header from './Header';
import ItemMenu from './ItemMenu';
import '../Styles/Menus.css';

function Home(){
    return(
    <div className="Home">
      <Header titulo = "Gerenciador de Livros"/>
      <div className = "Menu">
          <ItemMenu link = "/livros" titulo = "Livros"/>
          <ItemMenu link = "/autores" titulo = "Autores"/>
      </div>
    </div>
    );
}

export default Home;