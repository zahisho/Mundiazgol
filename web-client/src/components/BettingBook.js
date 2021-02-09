import React from 'react';
import { connect } from 'react-redux';

import GameBet from './GameBet';

import store from '../store';

import { setExtraBetGame, setWinnerBetTeam } from '../actions/BetActions';
import BettingBookService from '../services/BettingBookService';
import FormatHandler from '../utils/FormatHandler';

const BettingBook = ({ bettingBook, activeTeams }) => {
  if (bettingBook) {
    let extraBet;

    let saveBets = () => {
      let flag = true;
      for (let bet of bettingBook.bets) {
        flag &= bet.teamAScore !== undefined && bet.teamBScore !== undefined;
      }
      if (bettingBook.extraBet) {
        flag &= bettingBook.extraBet.teamAScore !== undefined && bettingBook.extraBet.teamBScore !== undefined;
      }
      if (flag) {
        if (bettingBook.extraBet) {
          let aBets = {};
          for (let bet of bettingBook.bets) {
            aBets[bet.gameId] = {};
            aBets[bet.gameId][bet.teamAScore] = {};
            aBets[bet.gameId][bet.teamAScore][bet.teamBScore] = true;
          }

          if (aBets[bettingBook.extraBet.gameId][bettingBook.extraBet.teamAScore]
            && aBets[bettingBook.extraBet.gameId][bettingBook.extraBet.teamAScore][bettingBook.extraBet.teamBScore]) {
            flag = false;
          }
        }
        if (flag) {
          BettingBookService.saveBettingBook(bettingBook).then(() => {
            alert('Se guardó exitosamente');
          }).catch((error) => {
            console.log(error);
            alert('No se pudo guardar');
          });
        } else {
          alert('Su Apuesta Doble es repetida');
        }
      } else {
        alert('Debe poner resultados a todos los partidos');
      }
    };

    let changeExtraBet = (event) => {
      let betIndex = Number.parseInt(event.target.value.split(' ')[1], 10) - 1;
      store.dispatch(setExtraBetGame(betIndex));
    };

    if (bettingBook.phase.withDouble) {
      extraBet = (
        <div className='center doble-bet-container'>
          <div>
            <strong>Apuesta doble </strong> <small>{FormatHandler.formatDate(bettingBook.extraBet.date)}</small>
          </div>
          <select className='extra-bet-selector' onChange={changeExtraBet} disabled={!bettingBook.enabled}>
            {bettingBook.bets.map((bet, index) => {
              return (
                <option key={index} selected={bet.gameId === bettingBook.extraBet.gameId}>
                  Partido {index + 1}
                </option>
              )
            })}
          </select>
          <GameBet withScore={bettingBook.phase.withScore}
            bet={bettingBook.extraBet}
            index={'extra'}
            enabled={bettingBook.enabled} />
          <div className='sep'></div>
        </div>
      );
    }

    let changeWinnerBetTeam = (event) => {
      let teamId;

      for (let team of activeTeams) {
        if (team.attributes.name === event.target.value) {
          teamId = team.id;
          break;
        }
      }

      store.dispatch(setWinnerBetTeam(teamId));
    };

    let winnerBet = (
      <div>
        <div>
          <strong>Tu campeón</strong>
        </div>
        <select onChange={changeWinnerBetTeam} className='extra-bet-selector' disabled={!bettingBook.enabled}>
          {
            activeTeams.map((team, i) => {
              return (
                <option key={i} selected={team.id === bettingBook.winnerBet.teamId}>
                  {team.attributes.name}
                </option>
              );
            })
          }
        </select>
      </div>
    );

    let checked;

    if (bettingBook.valid) {
      checked = (
        <img className='checked-img' src={require('../assets/img/check.png')} alt='img hábil' title='Habilitada' />
      );
    } else {
      checked = (
        <img className='checked-img' src={require('../assets/img/x.png')} alt='img no hábil' title='No habilitada' />
      );
    }

    return (
      <div className='bet-card my-card center'>
        {checked}
        <h6>{bettingBook.phase.name}</h6>
        <span className='small-text'>
          <strong>Cartilla disponible desde </strong>
          {FormatHandler.formatDate(bettingBook.initDate)}
          <strong> hasta </strong>
          {FormatHandler.formatDate(bettingBook.endDate)}
        </span>
        <div className='sep' />
        <div className='row'>
          <ul className='col-md column-hidden'>
            {bettingBook.bets.map((bet, index) => {
              if (!(index % 2)) {
                return (
                  <li key={index}>
                    <strong>Partido {index + 1} </strong> <small>{FormatHandler.formatDate(bet.date)}</small>
                    <GameBet withScore={bettingBook.phase.withScore}
                      bet={bet}
                      index={index}
                      enabled={bettingBook.enabled} />
                    <div className='sep'></div>
                  </li>
                )
              }
              else {
                return (undefined);
              }
            })}
            <div className='sep'></div>
          </ul>
          <ul className='col-md column-hidden'>
            {bettingBook.bets.map((bet, index) => {
              if (index % 2) {
                return (
                  <li key={index}>
                    <strong>Partido {index + 1} </strong> <small>{FormatHandler.formatDate(bet.date)}</small>
                    <GameBet withScore={bettingBook.phase.withScore}
                      bet={bet}
                      index={index}
                      enabled={bettingBook.enabled} />
                    <div className='sep'></div>
                  </li>
                )
              }
              else {
                return (undefined);
              }
            })}
            <div className='sep'></div>
          </ul>

          <ul className='col-md column-show'>
            {bettingBook.bets.map((bet, index) => {
              return (
                <li key={index}>
                  <strong>Partido {index + 1} </strong> <small>{FormatHandler.formatDate(bet.date)}</small>
                  <GameBet withScore={bettingBook.phase.withScore}
                    bet={bet}
                    index={index + 10}
                    enabled={bettingBook.enabled} />
                  <div className='sep'></div>
                </li>
              )
            })}
            <div className='sep'></div>
          </ul>
        </div>
        {extraBet}
        <div>
          {winnerBet}
        </div>
        <div className='sep'></div>
        <button className={'save-button ' + (bettingBook.enabled ? 'blue-button' : '')} onClick={saveBets} disabled={!bettingBook.enabled}>Guardar</button>
      </div>
    );
  } else {
    return (
      <div className='bet-card my-card center'>
        <h2><small>No hay cartillas</small></h2>
      </div>
    )
  }
};

const mapPropsToState = (state) => {
  return {
    bettingBook: state.bettingBook,
    activeTeams: state.activeTeams
  };
};

export default connect(mapPropsToState)(BettingBook);