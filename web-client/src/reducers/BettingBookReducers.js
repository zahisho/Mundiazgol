
const bettingBook = (state = null, action) => {
  if (action.type === 'SET_BETTING_BOOK') {
    return action.bettingBook;
  }
  if (action.type === 'SET_GAME_SCORE') {
    let nBettingBook = { ...state };
    nBettingBook.bets = [];

    for (let bet of state.bets) {
      let nBet = { ...bet };
      if (bet.id === action.bet.id) {
        nBet.teamAScore = action.bet.teamAScore;
        nBet.teamBScore = action.bet.teamBScore;
      }
      nBettingBook.bets.push(nBet);
    }

    return nBettingBook;
  }
  if (action.type === 'SET_EXTRA_BET_GAME') {
    let nBettingBook = { ...state };
    nBettingBook.extraBet = { ...state.bets[action.betIndex] };

    nBettingBook.extraBet.id = state.extraBet.id;
    nBettingBook.extraBet.teamAScore = undefined;
    nBettingBook.extraBet.teamBScore = undefined;

    return nBettingBook;
  }
  if (action.type === 'SET_WINNER_BET_TEAM') {
    let nBettingBook = { ...state };

    nBettingBook.winnerBet.teamId = action.teamId;

    return nBettingBook;
  }
  return state;
};

const bettingBooks = (state = [], action) => {
  if (action.type === 'SET_BETTING_BOOKS') {
    return action.bettingBooks;
  }
  return state;
};

const users = (state = [], action) => {
  if (action.type === 'SET_VALID_BETS') {
    return action.users;
  }
  if (action.type === 'SET_VALID_USER') {
    let nusers = [...state];

    for (let user of nusers) {
      if (user.id === action.userId) {
        user.valid = action.valid;
      }
    }

    return nusers;
  }
  return state;
}

export { bettingBook, bettingBooks, users };