import axios from "axios";

import { apiEndPoint } from "../config.json";
let checkOutUrl = apiEndPoint + "checkout";

let shippingDetailUrl = apiEndPoint + "get_shipping_details/";
let checkoutUserDetailUrl = apiEndPoint + "get_checkout_details/";

export async function shippingDetailService(data) {
  return await axios({
    method: "get",
    url: shippingDetailUrl + data,
  });
}

export async function getCheckoutUserDetail(data, token) {
  return await axios({
    method: "get",
    url: checkoutUserDetailUrl + data,
    headers: {
      "Content-Type": "application/json",

      Authorization: token,
    },
  });
}

export async function checkOut(data, token) {
  return await axios({
    method: "post",
    url: checkOutUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
}
