
const activeTeams = (state = [], action) => {
  if (action.type === 'SET_ACTIVE_TEAMS') {
    return action.activeTeams;
  }
  return state;
}

export { activeTeams };