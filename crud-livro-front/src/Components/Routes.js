import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './Home';
import Autor from './Autor';
import Livro from './Livro';

function Routes(){
    return(
        <BrowserRouter>
            <Route component = {Home} path = "/" exact/>
            <Route component = {Autor} path = "/autores"/>
            <Route component = {Livro} path = "/livros"/>
        </BrowserRouter>
    )
}

export default Routes;