export const shopProfileFetchLoading = (data) => {
  return {
    type: "PROFILE_INFO_LOADING",
    payload: data,
  };
};

export const userProfileSaveLoading = (data) => {
  return {
    type: "PROFILE_INFO_SAVE_LOADING",
    payload: data,
  };
};
export const graphCall = () => {
  return {
    type: "GRAPH_CALL",
  };
};

export const reCallProfileApi = () => {
  return {
    type: "RECALL_PROFILE_API",
  };
};

export const closeSideBar = (data) => {
  return {
    type: "CLOSE_SIDE_BAR",
    payload: data,
  };
};
