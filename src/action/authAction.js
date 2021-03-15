export const phoneSaveAction = (data) => {
  return {
    type: "SAVE_MOBILE_NUMBER",
    payload: data,
  };
};

export const profileDialogAction = (data) => {
  return {
    type: "SHOW_PROFILE_DIALOG",
    payload: data,
  };
};
export const setProfileImage = (data) => {
  return {
    type: "PROFILE_IMAGE_URL",
    payload: data,
  };
};
export const resetUser = () => {
  return {
    type: "RESET",
  };
};
