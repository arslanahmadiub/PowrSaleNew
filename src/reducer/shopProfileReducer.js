import companyLogo from "../assets/images/dummyLogo.png";

const initalState = {
  shopPreview: {
    logo: companyLogo,
    name: "GoPare",
    brief: "Irure enimIrure enim ullamco exercitation incididunt.",
    social: { fb: "arslanahmadiub", ig: "arslanahmadiub", wp: "", tt: "" },
    contacts: {
      phone: 123456780,
      email: "someone@exmaple.com",
      address: "some business location, midtown ave.",
    },
    description: "Electronics",
    shopId: "#345244",
  },
  preview: false,
  shopData: {},
  formData: false,
  filePicker: false,
  loadingDialog: false,
  shopIdCollections: [],
  selectedShop: "",
  selectedShopId: "",
  selectedTab: 0,
  shopProfile: {},
};

export const shopProfileReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SHOP_PREVIEW":
      return {
        ...state,
        shopPreview: action.payload,
      };
    case "SHOP_PREVIEW_DIALOG":
      return {
        ...state,
        preview: action.payload,
      };
    case "SAVE_SHOP_DATA":
      return {
        ...state,
        shopData: action.payload,
      };
    case "CLEAR_FORM_DATA":
      return {
        ...state,
        formData: action.payload,
      };
    case "CLEAR_FILE_PICKER":
      return {
        ...state,
        filePicker: action.payload,
      };
    case "SHOW_LOADING_DIALOG":
      return {
        ...state,
        loadingDialog: action.payload,
      };
    case "SET_SHOP_IDS":
      return {
        ...state,
        shopIdCollections: action.payload,
      };
    case "SELECTED_SHOP_ID":
      return {
        ...state,
        selectedShopId: action.payload,
      };
    case "SELECTED_SHOP_NAME":
      return {
        ...state,
        selectedShop: action.payload,
      };
    case "SELECTED_TAB_INDEX":
      return {
        ...state,
        selectedTab: action.payload,
      };
    case "SHOP_PROFILE_INFO":
      return {
        ...state,
        shopProfile: action.payload,
      };
    case "RESET":
      return initalState;
    default:
      return state;
  }
};
