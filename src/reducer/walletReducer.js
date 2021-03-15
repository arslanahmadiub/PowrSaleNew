const initalState = {
  card: [],
  transaction: true,
  codeBoxShow: false,
};

export const walletReducer = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_WALLET_CARD":
      return {
        ...state,
        card: [...state.card, action.payload],
      };
    case "FETCH_WELLET_CARD":
      return {
        ...state,
        card: action.payload,
      };
    case "TRANSACTION_GET":
      return {
        ...state,
        transaction: action.payload,
      };
    case "CODE_BOX_SHOW":
      return {
        ...state,
        codeBoxShow: action.payload,
      };
    case "RESET":
      return initalState;
    default:
      return state;
  }
};
