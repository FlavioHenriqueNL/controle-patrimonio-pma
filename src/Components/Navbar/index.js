import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import {Container} from 'react-bootstrap';
import MenuLateral from './MenuLateral';
import logoPref from '../../Assets/img/logo-pref.svg';

import './style.css';

const Navbar = () => {

  return(
    <>
      <AppBar position="static" className="navbar">
        <Container>
          <Toolbar className="toolbar">
            <MenuLateral/>
            <img className="logo-pref" src={logoPref} alt="Prefeitura Municipal de Arapiraca"/>
            <div className="info-usuario">
              <p>Nome do usuário</p>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Navbar;