import axios from "axios";
import { apiEndPoint } from "../config.json";

// let userToken = "92c6544f868181b32ad25533fc3633ec6d450d77";
let userToken = localStorage.getItem("token");

let dashboardUrl = apiEndPoint + "get_dashboard";
let shopIdsUrl = apiEndPoint + "get_shops_user";

export async function getDashboardData(token) {
  return await axios({
    method: "get",
    url: dashboardUrl,
    headers: {
      Authorization: token,
    },
  });
}

export async function getShopIds(token) {
  return await axios({
    method: "get",
    url: shopIdsUrl,
    headers: {
      Authorization: token,
    },
  });
}
