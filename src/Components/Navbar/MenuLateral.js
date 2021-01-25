import {FiMenu, FiPlus, FiLogOut, FiEdit} from 'react-icons/fi';
import {FaExchangeAlt, FaListAlt} from 'react-icons/fa';
import {HiOutlineDesktopComputer} from 'react-icons/hi';
import {MdExpandLess, MdExpandMore} from 'react-icons/md';
import {GrClose} from 'react-icons/gr';
import {AiFillHome} from 'react-icons/ai';
import {FcStatistics} from 'react-icons/fc';

import React, {useState} from 'react';
import {Drawer, List, Divider, ListItem, ListItemText, ListItemIcon, Collapse} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import './style.css';

const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setIsCollapsed] = useState({
    patrimonio: false,
    movimentacao: false, 
  });

  const handleCollapse = (listItem) => {
    setIsCollapsed({...collapsed, [listItem]: !collapsed[listItem]});
    console.log(collapsed.patrimonio);
  }

  const history = useHistory();

  return(
    <>
      <FiMenu onClick={() => setIsOpen(true)} className="menu-icon"/>

      <Drawer className="drawer" open={isOpen} onClose={() => setIsOpen(false)}>
        <List className="list">
          <ListItem>
            <GrClose className="closeDrawer" onClick={() => setIsOpen(false)}/>
            <Divider/>
          </ListItem>

          <ListItem className="listItem" button onClick={() => history.push('/')}>
            <ListItemIcon className="listIcon"><AiFillHome/></ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItem>
          
          {/* PATRIMONIOS */}
          <ListItem className="listItem" button onClick={() => handleCollapse('patrimonio')}>
            <ListItemIcon className="listIcon"><HiOutlineDesktopComputer/></ListItemIcon>
            <ListItemText primary="Patrimônios" />
            {collapsed.patrimonio ? <MdExpandLess/> : <MdExpandMore/>}
          </ListItem>
          <Collapse className="listCollapse" in={collapsed.patrimonio} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className="listItem" button onClick={() => history.push('/patrimonios')}>
                <ListItemIcon className="listIcon"><FaListAlt/></ListItemIcon>
                <ListItemText primary="Lista de Patrimonios" />
              </ListItem>
              <ListItem className="listItem" button onClick={() => history.push('/patrimonios/novo')}>
                <ListItemIcon className="listIcon"><FiPlus/></ListItemIcon>
                <ListItemText primary="Adicionar Patrimônio" />
              </ListItem>
              <ListItem className="listItem" button onClick={() => history.push('/patrimonios/editar')}>
                <ListItemIcon className="listIcon"><FiEdit/></ListItemIcon>
                <ListItemText primary="Editar Patrimônio" />
              </ListItem>
            </List>
          </Collapse>
          <Divider/>

          {/* MOVIMENTAÇÕES */}
          <ListItem className="listItem" button onClick={() => handleCollapse('movimentacao')}>
            <ListItemIcon className="listIcon"><FaExchangeAlt/></ListItemIcon>
            <ListItemText primary="Movimentações" />
            {collapsed.movimentacao ? <MdExpandLess/> : <MdExpandMore/>}
          </ListItem>
          <Collapse className="listCollapse" in={collapsed.movimentacao} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className="listItem" button onClick={() => history.push('movimentacao/novo')}>
                <ListItemIcon className="listIcon"><FiPlus/></ListItemIcon>
                <ListItemText primary="Adicionar Movimentação" />
              </ListItem>
              <ListItem className="listItem" button onClick={() => history.push('movimentacoes')}>
                <ListItemIcon className="listIcon"><FaListAlt/></ListItemIcon>
                <ListItemText primary="Lista de Movimentações" />
              </ListItem>
            </List>
          </Collapse>
          <Divider/>

          <ListItem className="listItem" button onClick={() => alert('Funcionalidade em desenvolvimento')}>
            <ListItemIcon className="listIcon"><FcStatistics/></ListItemIcon>
            <ListItemText primary="Estatísticas e Relatorios"/>
          </ListItem>


          <ListItem className="listItem" id="logoutItem" button onClick={() => alert('Funcionalidade em desenvolvimento')}>
            <ListItemIcon className="listIcon"><FiLogOut/></ListItemIcon>
            <ListItemText primary="Sair do Sistema"/>
          </ListItem>




        </List>
      </Drawer>
    </>
  )
}

export default MenuLateral;