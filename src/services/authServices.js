import axios from "axios";

import { apiEndPoint } from "../config.json";

let createUserUrl = apiEndPoint + "create_user";
let loginUserUrl = apiEndPoint + "login";
let completeUserProfileUrl = apiEndPoint + "complete_profile";
let getUserDetailUrl = apiEndPoint + "get_user_details";
let loginUserFacebookUrl = apiEndPoint + "facebook";
let loginUserGoogleUrl = apiEndPoint + "google";
let resetPasswordUrl = apiEndPoint + "reset_password_mail";

export async function createUser(data) {
  return await axios({
    method: "post",
    url: createUserUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function loginUser(data) {
  return await axios({
    method: "post",
    url: loginUserUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function completeUserProfile(data, token) {
  return await axios({
    method: "post",
    url: completeUserProfileUrl,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
}

export async function getFullUserDetails(token) {
  return await axios({
    method: "get",
    url: getUserDetailUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
}

export async function loginUserWithGoogle(data) {
  return await axios({
    method: "post",
    url: loginUserGoogleUrl,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function loginUserWithFacebook(data) {
  return await axios({
    method: "post",
    url: loginUserFacebookUrl,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function resetPasswordService(data) {
  return await axios({
    method: "post",
    url: resetPasswordUrl,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
