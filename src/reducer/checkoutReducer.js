const initalState = {
  checkoutUserDetail: [],
  checkoutShipingDetail: [],
  checkoutPaymentDetail: [],
};

export const checkoutReducer = (state = initalState, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return {
        ...state,
        checkoutUserDetail: action.payload,
      };
    case "SHIPING_DETAILS":
      return {
        ...state,
        checkoutShipingDetail: action.payload,
      };
    case "PAYMENT_DETAILS":
      return {
        ...state,
        checkoutPaymentDetail: action.payload,
      };
    case "RESET":
      return initalState;
    default:
      return state;
  }
};
