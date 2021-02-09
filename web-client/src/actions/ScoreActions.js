import BettingBookService from '../services/BettingBookService';

const setScoreTable = (bettingBookId) => {
  return (dispatch) => {
    return BettingBookService.getScoreTable(bettingBookId).then((scoreTable) => {
      dispatch({
        type: 'SET_SCORE_TABLE',
        scoreTable
      });
    });
  };
};

export { setScoreTable };