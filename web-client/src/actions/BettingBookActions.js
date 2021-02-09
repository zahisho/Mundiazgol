import BettingBookService from '../services/BettingBookService';

let flag = false;

const setBettingBook = (bettingBookId) => {
  return (dispatch) => {
    if (!flag) {
      flag = true;
      return BettingBookService.getBettingBook(bettingBookId).then((bettingBook) => {
        flag = false;
        dispatch({
          type: 'SET_BETTING_BOOK',
          bettingBook
        });
      }).catch((error) => {
        flag = false;
      });
    }
  };
};

const loadBettingBooks = () => {
  return (dispatch) => {
    return BettingBookService.loadBettingBooks().then((bettingBooks) => {
      dispatch({
        type: 'SET_BETTING_BOOKS',
        bettingBooks
      });
    });
  };
};

const getValidBetsSummary = (bettingBookId) => {
  return (dispatch) => {
    return BettingBookService.getValidBetsSummary(bettingBookId).then((users) => {
      dispatch({
        type: 'SET_VALID_BETS',
        users
      });
    });
  };
};

const setValidUser = (userId, valid) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_VALID_USER',
      userId,
      valid
    });
  };
}

export { setBettingBook, loadBettingBooks, getValidBetsSummary, setValidUser };