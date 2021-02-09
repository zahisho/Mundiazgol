import React from 'react';
import { connect } from 'react-redux';
import UserService from '../services/UserService';
import { setValidUser } from '../actions/BettingBookActions';

const BetAdministration = ({ users, bettingBook, updateSummary }) => {

  let header = (
    <thead>
      <tr>
        <th>Usuario</th>
        <th>Validado</th>
      </tr>
    </thead>
  );

  let handleChange = (event) => {
    let userId = event.target.name;
    let valid = event.target.checked;
    UserService.validateBets(bettingBook.id, userId, valid)
      .then(() => {
        updateSummary(userId, valid);
      }).catch((error) => {
        console.log(error);
        alert('No se pudo guardar');
      });
  };

  let body = (
    <tbody>
      {
        users.map((user, index) => {
          return (
            <tr key={index}>
              <td>
                {user.name}
              </td>
              <td>
                <input type='checkbox' checked={user.valid} onChange={handleChange} name={user.id} />
              </td>
            </tr>
          );
        })
      }
    </tbody>
  );

  return (
    <div className='bet-card my-card center'>
      <table>
        {header}
        {body}
      </table>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    users: state.users,
    bettingBook: state.bettingBook
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSummary: (userId, valid) => {
      dispatch(setValidUser(userId, valid));
    }
  }
};

export default connect(mapPropsToState, mapDispatchToProps)(BetAdministration);