import enviroment from '../enviroment';

import React from 'react';
import store from '../store';
import { setGameScore } from '../actions/BetActions';

const GameBet = ({ withScore, bet, index, enabled }) => {
  const imagesUrl = enviroment.serverURL + '/public/images/';

  let teamA = bet.teamA;
  let teamB = bet.teamB;

  let contentA;
  let contentB;
  let tieContent;

  let validate = (evt) => {
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regex = /[0-9]/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  let handleChange = (event) => {
    if (withScore) {
      if (event.target.value) {
        bet[event.target.id] = Number.parseInt(event.target.value, 10);
      } else {
        bet[event.target.id] = undefined;
      }
    } else {
      switch (event.target.id) {
        case 'teamAScore':
          bet.teamAScore = 1;
          bet.teamBScore = 0;
          break;
        case 'teamBScore':
          bet.teamAScore = 0;
          bet.teamBScore = 1;
          break;
        default:
          bet.teamAScore = 0;
          bet.teamBScore = 0;
          break;
      }
    }
    store.dispatch(setGameScore(bet));
  };

  if (withScore) {
    contentA = (
      <input className='bet-input' type='text' onKeyPress={validate} id='teamAScore'
        value={(bet.teamAScore !== undefined) ? bet.teamAScore : ''} onChange={handleChange}
        disabled={!enabled} />
    );
    contentB = (
      <input className='bet-input' type='text' onKeyPress={validate} id='teamBScore'
        value={(bet.teamBScore !== undefined) ? bet.teamBScore : ''} onChange={handleChange}
        disabled={!enabled} />
    );
  } else {
    contentA = (
      <input className='bet-input' name={'radio-group' + index} id='teamAScore' type='radio' checked={bet.teamAScore === 1} onChange={handleChange}
        disabled={!enabled} />
    );

    tieContent = (
      <input className='bet-input' name={'radio-group' + index} id='draw' type='radio'
        checked={bet.teamAScore === 0 && bet.teamBScore === 0} onChange={handleChange}
        disabled={!enabled} />
    );

    contentB = (
      <input className='bet-input' name={'radio-group' + index} id='teamBScore' type='radio' checked={bet.teamBScore === 1} onChange={handleChange}
        disabled={!enabled} />
    );
  }

  return (
    <div className='bet-item'>
      <div className='team-item left'>
        <img src={imagesUrl + teamA.flagImg} alt='bandera' />
        <label>{teamA.name}</label>
      </div>
      <div className='team-item-small left'>
        <img src={imagesUrl + teamA.flagImg} alt='bandera' />
        <label>{teamA.name}</label>
      </div>
      {contentA}
      {tieContent}
      {contentB}
      <div className='team-item right'>
        <label>{teamB.name}</label>
        <img src={imagesUrl + teamB.flagImg} alt='bandera' />
      </div>
      <div className='team-item-small right'>
        <img src={imagesUrl + teamB.flagImg} alt='bandera' />
        <label>{teamB.name}</label>
      </div>
    </div>
  );
}

export default GameBet;