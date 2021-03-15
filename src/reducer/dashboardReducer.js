const initalState = {
  profileDataLoading: false,
  profileDataSaveLoading: false,
  graph: false,
  recall: true,
  closeSide: false,
};

export const dashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case "PROFILE_INFO_LOADING":
      return {
        ...state,
        profileDataLoading: action.payload,
      };
    case "PROFILE_INFO_SAVE_LOADING":
      return {
        ...state,
        profileDataSaveLoading: action.payload,
      };
    case "GRAPH_CALL":
      return {
        ...state,
        graph: !state.graph,
      };
    case "RECALL_PROFILE_API":
      return {
        ...state,
        reCall: !state.recall,
      };
    case "CLOSE_SIDE_BAR":
      return {
        ...state,
        closeSide: action.payload,
      };
    case "RESET":
      return initalState;
    default:
      return state;
  }
};
