import {Drawer, List, Divider, ListItem, ListItemText, ListItemIcon, Collapse} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {FiMenu, FiPlus} from 'react-icons/fi';
import {FaExchangeAlt, FaListAlt} from 'react-icons/fa';
import {HiOutlineDesktopComputer} from 'react-icons/hi';
import {MdExpandLess, MdExpandMore} from 'react-icons/md';
import {GrClose} from 'react-icons/gr';
import React, {useState} from 'react';
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
        <List>
          <ListItem>
            <GrClose className="closeDrawer" onClick={() => setIsOpen(false)}/>
            <Divider/>
          </ListItem>

          <ListItem className="listItem" button onClick={() => handleCollapse('patrimonio')}>
            <ListItemIcon className="listIcon"><HiOutlineDesktopComputer/></ListItemIcon>
            <ListItemText primary="Patrimônios" />
            {collapsed.patrimonio ? <MdExpandLess/> : <MdExpandMore/>}
          </ListItem>
          <Collapse className="listCollapse" in={collapsed.patrimonio} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className="listItem" button onClick={() => history.push('patrimonios/novo')}>
                <ListItemIcon className="listIcon"><FiPlus/></ListItemIcon>
                <ListItemText primary="Adicionar Patrimônio" />
              </ListItem>
              <ListItem className="listItem" button onClick={() => history.push('patrimonios')}>
                <ListItemIcon className="listIcon"><FaListAlt/></ListItemIcon>
                <ListItemText primary="Lista de Patrimonios" />
              </ListItem>
            </List>
          </Collapse>
          <Divider/>

          <ListItem>
            <Link to="/movimentacoes">
              <FaExchangeAlt/> Movimentações
            </Link>
          </ListItem>

        </List>
      </Drawer>
    </>
  )
}

export default MenuLateral;