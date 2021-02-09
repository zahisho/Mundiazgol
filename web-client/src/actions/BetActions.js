
const setGameScore = (bet) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_GAME_SCORE',
      bet
    });
  };
};

const setExtraBetGame = (betIndex) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_EXTRA_BET_GAME',
      betIndex
    });
  };
};

const setWinnerBetTeam = (teamId) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_WINNER_BET_TEAM',
      teamId
    });
  };
};

export { setGameScore, setExtraBetGame, setWinnerBetTeam };