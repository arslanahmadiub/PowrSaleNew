export const logoImage = (data) => {
  return {
    type: "SET_LOGO",
    payload: data,
  };
};
export const logoImageFile = (data) => {
  return {
    type: "SET_LOGO_FILE",
    payload: data,
  };
};
