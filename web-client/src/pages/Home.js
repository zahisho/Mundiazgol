import React from 'react';
import Parse from 'parse';

const Home = () => {
  let adminButton;
  if (Parse.User.current() && Parse.User.current().attributes.username === 'miguel') {
    adminButton = (
      <a className='blue-button administration-button' href='/#/administration'>Administrar cartillas</a>
    );
  }
  return (
    <div className='principal-body'>
      <div className='row margin-zero'>
        <div className='col-md-6'>
        </div>
        <div className='col-md-6 col-sm-12 center menu-container'>
          <a className='blue-button bet-button' href='/#/bet'>Apuestas</a>
          <a className='blue-button results-button' href='/#/score'>Tabla de posiciones</a>
          {adminButton}
        </div>
      </div>
    </div>
  );
}

export default Home;