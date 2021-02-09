
const scoreTable = (state = null, action) => {
  if (action.type === 'SET_SCORE_TABLE') {
    return action.scoreTable;
  }
  return state;
}

export { scoreTable };