export const shopPreview = (data) => {
  return {
    type: "SHOP_PREVIEW",
    payload: data,
  };
};

export const shopPreviewDialog = (data) => {
  return {
    type: "SHOP_PREVIEW_DIALOG",
    payload: data,
  };
};
export const saveShopData = (data) => {
  return {
    type: "SAVE_SHOP_DATA",
    payload: data,
  };
};
export const clearFormData = (data) => {
  return {
    type: "CLEAR_FORM_DATA",
    payload: data,
  };
};
export const clearFilePicker = (data) => {
  return {
    type: "CLEAR_FILE_PICKER",
    payload: data,
  };
};
export const showLoading = (data) => {
  return {
    type: "SHOW_LOADING_DIALOG",
    payload: data,
  };
};
export const shopIdsAction = (data) => {
  return {
    type: "SET_SHOP_IDS",
    payload: data,
  };
};
export const selectedShopId = (data) => {
  return {
    type: "SELECTED_SHOP_ID",
    payload: data,
  };
};
export const selectedShopName = (data) => {
  return {
    type: "SELECTED_SHOP_NAME",
    payload: data,
  };
};
export const selectedTabIndex = (data) => {
  return {
    type: "SELECTED_TAB_INDEX",
    payload: data,
  };
};
export const setShopInfo = (data) => {
  return {
    type: "SHOP_PROFILE_INFO",
    payload: data,
  };
};
