import axios from "axios";
import { apiEndPoint } from "../config.json";

// let userToken = "92c6544f868181b32ad25533fc3633ec6d450d77";
let userToken = localStorage.getItem("token");

let transistionProgressUrl = apiEndPoint + "get_transactions/";
let updateDeliveryStatusUrl = apiEndPoint + "update_delivery_status";
let disputeUrl = apiEndPoint + "open_dispute/";

export async function getProgressTransistion(token, url) {
  return await axios({
    method: "get",
    url: transistionProgressUrl + url,
    headers: {
      Authorization: token,
    },
  });
}

export async function updateDeliveryStatus(data, token) {
  return await axios({
    method: "post",
    url: updateDeliveryStatusUrl,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}
export async function disputeTransaction(data, token, trxId) {
  return await axios({
    method: "post",
    url: disputeUrl + trxId,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}
