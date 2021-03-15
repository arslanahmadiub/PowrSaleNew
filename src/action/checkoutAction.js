export const detailAction = (data) => {
  return {
    type: "USER_DETAILS",
    payload: data,
  };
};

export const shipingAction = (data) => {
  return {
    type: "SHIPING_DETAILS",
    payload: data,
  };
};

export const paymentAction = (data) => {
  return {
    type: "PAYMENT_DETAILS",
    payload: data,
  };
};
