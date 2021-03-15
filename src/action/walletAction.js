export const addCard = (data) => {
  return {
    type: "ADD_WALLET_CARD",
    payload: data,
  };
};
export const reCallTransisation = (data) => {
  return {
    type: "TRANSACTION_GET",
    payload: data,
  };
};
export const showCodeBox = (data) => {
  return {
    type: "CODE_BOX_SHOW",
    payload: data,
  };
};
