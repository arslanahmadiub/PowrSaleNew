import React, { useState, useEffect } from "react";

import "./Profile.css";
import ProfileEdit from "./ProfileEdit";
import { Modal } from "antd";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { profileDialogAction } from "../../../action/authAction";

const CompleteProfile = (props) => {
  const profileDialogValue = useSelector((state) => state.auth.profileDialog);

  let element = document.getElementById("documentBody");

  useEffect(() => {
    if (profileDialogValue === false) {
      setTimeout(() => {
        element.style.overflow = "scroll";
      }, 500);
    }
  }, [profileDialogValue]);

  const dispatch = useDispatch();

  let handelCancel = () => {
    dispatch(profileDialogAction(false));
  };
  return (
    <Modal
      visible={profileDialogValue}
      onCancel={handelCancel}
      width={1000}
      footer={null}
    >
      <ProfileEdit />
    </Modal>
  );
};

export default CompleteProfile;
