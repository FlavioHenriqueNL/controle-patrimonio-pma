import {Drawer, List, Divider, ListItem, ListItemText} from '@material-ui/core';
import {FiMenu} from 'react-icons/fi';
import React, {useState} from 'react';

const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false);
  return(
    <>
      <FiMenu onClick={() => setIsOpen(true)} className="menu-icon"/>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>

      </Drawer>
    </>
  )
}

export default MenuLateral;