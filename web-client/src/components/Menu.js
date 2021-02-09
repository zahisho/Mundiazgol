import React from 'react';

const Menu = (props) => {
  return (
    <div className='menu'>
      <a href='/#/' className='menu-title'> &#060; <span className='menu-title-hide'>COPA MUNDIAL DE LA FIFA RUSIA 2018</span></a>
      <div className='logout-button' onClick={props.logOut}> Salir </div>
    </div>
  );
};

export default Menu;