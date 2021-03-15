import axios from "axios";
import { apiEndPoint } from "../config.json";

let createShopUrl = apiEndPoint + "create_shop";
let addProductUrl = apiEndPoint + "add_product";
let productDetail = apiEndPoint + "get_product_details/";
let addProductDeliveryTermUrl = apiEndPoint + "add_product_delivery_terms";

let shopDetailUrl = apiEndPoint + "get_shop_details/";

let publicShopDetailUrl = apiEndPoint + "shop_link_visit/";
let getShopDetailUrl = apiEndPoint + "get_only_shop_details/";
let editShopDetialUrl = apiEndPoint + "edit_shop/";

export async function shopCreate(data, token) {
  return await axios({
    method: "post",
    url: createShopUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
}

export async function addProduct(data, token) {
  return await axios({
    method: "post",
    url: addProductUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
}

export async function productDeliveryTerm(data, token) {
  return await axios({
    method: "post",
    url: addProductDeliveryTermUrl,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}
export async function getCatalogData(id) {
  return await axios({
    method: "get",
    url: shopDetailUrl + id,
  });
}
export async function publicShopDetail(id) {
  return await axios({
    method: "get",
    url: publicShopDetailUrl + id,
  });
}

export async function getProductDetail(id) {
  return await axios({
    method: "get",
    url: productDetail + id,
  });
}
export async function getOnlyShopDetail(id) {
  return await axios({
    method: "get",
    url: getShopDetailUrl + id,
  });
}

export async function editShopDetail(id, data, token) {
  return await axios({
    method: "post",
    url: editShopDetialUrl + id,

    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
}
