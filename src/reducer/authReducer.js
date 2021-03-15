const initalState = {
  phoneNumber: {},
  profileDialog: false,
  profileUrl: null,
};

export const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SAVE_MOBILE_NUMBER":
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case "SHOW_PROFILE_DIALOG":
      return {
        ...state,
        profileDialog: action.payload,
      };
    case "PROFILE_IMAGE_URL":
      return {
        ...state,
        profileUrl: action.payload,
      };
    case "RESET":
      return initalState;

    default:
      return state;
  }
};
