import React from 'react';
import { connect } from 'react-redux';

import enviroment from '../enviroment';

const ScoreTable = ({ scoreTable }) => {

  if (scoreTable) {
    const imagesUrl = enviroment.serverURL + '/public/images/';

    let withScore = scoreTable.phase.withScore;

    let header = (
      <thead>
        <tr>
          <th>Posición</th>
          <th>Nombre</th>
          {
            scoreTable.games.map((game, i) => {
              return (
                <th className='column-hidden' key={i}
                  title={game.teamA.name + ((game.finished) ? (' (' + game.teamAScore + ')') : '') +
                    ' vs ' +
                    game.teamB.name + ((game.finished) ? (' (' + game.teamBScore + ')') : '')
                  }>
                  <img src={imagesUrl + game.teamA.flagImg} alt='Bandera A' />
                  <img src={imagesUrl + game.teamB.flagImg} alt='Bandera B' />
                </th>
              );
            })
          }
          <th>Total aciertos</th>
        </tr>
      </thead>
    );

    let body = (
      <tbody>
        {
          scoreTable.users.map((user, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                {
                  scoreTable.games.map((game, j) => {
                    if (game.finished) {
                      if (user.hits[j].flag) {
                        return (
                          <td className='column-hidden' key={j}>
                            <img className='table-img' src={require('../assets/img/check.png')} alt='Acertado'
                              title={(withScore) ? (user.hits[j].teamAScore + ' - ' + user.hits[j].teamBScore) : undefined} />
                          </td>
                        );
                      } else {
                        return (
                          <td className='column-hidden' key={j}>
                            <img className='table-img' src={require('../assets/img/x.png')} alt='Fallado'
                              title={(withScore) ? (user.hits[j].teamAScore + ' - ' + user.hits[j].teamBScore) : undefined} />
                          </td>
                        );
                      }
                    } else {
                      return (
                        <td className='column-hidden' key={j}>
                          <img className='table-img' src={require('../assets/img/question.png')} alt='No definido' />
                        </td>
                      );
                    }
                  })
                }
                <td>
                  {user.totalHits}
                </td>
              </tr>
            );
          })
        }
      </tbody>
    );

    return (
      <div className='bet-card my-card center'>
        <h6>{scoreTable.phase.name}</h6>
        <table>
          {header}
          {body}
        </table>
      </div>
    );
  } else {
    return (
      <div className='bet-card my-card center'>
        <h2><small>No hay apuestas</small></h2>
      </div>
    )
  }
};

const mapPropsToState = (state) => {
  return {
    scoreTable: state.scoreTable
  };
};

export default connect(mapPropsToState)(ScoreTable);