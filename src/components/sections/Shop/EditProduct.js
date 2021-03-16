import React from "react";
import EditProductForm from "../../Forms/EditProductForm";
import Button from "../../CustomComponents/Button";
import { useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import { Hidden } from "@material-ui/core";

const EditProduct = () => {
  const history = useHistory();

  let handelCancel = () => {
    history.push("/shopPreview");
  };

  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <div
          style={{
            background: "#F5F8FD",
            marginLeft: "3%",
            marginRight: "3%",
            borderRadius: "5%",
          }}
        >
          <div
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingTop: "5%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Edit Product</h1>
            <Button
              background="#EB5757"
              slim
              width="100px"
              onClick={handelCancel}
            >
              Cancel
            </Button>
          </div>
          <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <EditProductForm />
          </div>
        </div>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <div
          style={{
            background: "#F5F8FD",
          }}
        >
          <div
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingTop: "5%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Edit Product</h4>
            <Button
              onClick={handelCancel}
              style={{
                background: "#EB5757",
                color: "white",
                width: "70px",
                fontSize: "10px",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div
          style={{
            background: "#F5F8FD",
            padding: "2%",
            overflowX: "hidden",
          }}
        >
          <EditProductForm />
        </div>
      </Hidden>
    </>
  );
};

export default EditProduct;
