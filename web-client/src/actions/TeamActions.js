import TeamService from "../services/TeamService";

const loadActiveTeams = () => {
  return (dispatch) => {
    return TeamService.getActiveTeams().then((activeTeams) => {
      dispatch({
        type: 'SET_ACTIVE_TEAMS',
        activeTeams
      });
    });
  };
};

export { loadActiveTeams };