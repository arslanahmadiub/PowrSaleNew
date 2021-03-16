import { Dialog, DialogTitle } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import BreadCrumbs from "./BreadCrumbs";
import ProductDescription from "./ProductDescription";
import Button from "../../../CustomComponents/Button";
import { deleteProduct } from "../../../../services/shopServices";
import { selectedTabIndex } from "../../../../action/shopAction";
import { refreshCatalog } from "../../../../action/shopAction";
import { setProductId } from "../../../../action/shopAction";
import { useDispatch, useSelector } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useHistory } from "react-router";
import { Hidden } from "@material-ui/core";

const Container = Styled.div`
    cursor: pointer;
    background: '#fff'
`;
const ImageContainer = Styled.div`
    height: 150px;
    width: 150px;
    background: #FFFFFF;
    border-radius: 15px;
    object-fit: cover;

`;
const Img = Styled.img`
    height: 130px;
    width: 130px;
    margin: auto;
    object-fit: cover;

`;
const Price = Styled.div`
    font-size: 20px;
    font-weight: 600;
`;
const Description = Styled.div`
    font-size: 14px;
    width: 170px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = Styled.div`
    font-size: 18px;
    font-weight:;
    margin: 0 0 0 5px;
    line-height: 25px;    
`;

const ButtonContainer = Styled.div`
    width: 50px;
    heigth: 50px;
`;

const Product = (props) => {
  const [dialog, setDialog] = React.useState(false);
  const dispatch = useDispatch();
  let [payDialog, setPayDialog] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const history = useHistory();

  let [paymentDetail, setPaymentDetail] = useState();

  const details = props.details;

  const toggleDialog = (event) => {
    setDialog(!dialog);
  };

  let payDialogUpdate = (value) => {
    setPayDialog(value);
  };
  let paymentData = (value) => {
    setPaymentDetail(value);
  };

  useEffect(() => {
    payDialogUpdate();
  }, [props.updateDialog]);

  let handelProductDelete = async () => {
    setConfirmShow(true);
  };

  let handleClose = () => {
    setConfirmShow(false);
  };

  let handleProductDeleteYes = async () => {
    try {
      let { data } = await deleteProduct(details.productId);

      if (data.Success) {
        setConfirmShow(false);

        dispatch(refreshCatalog());
        setDialog(!dialog);
      }
    } catch (error) {
      setConfirmShow(false);
    }
  };

  let handelProductEdit = () => {
    dispatch(setProductId(details.productId));
    // dispatch(selectedTabIndex(3));
    history.push("/editProduct");
  };

  let siteAddress = window.location.href;
  let finalUrl = siteAddress.slice(
    siteAddress.lastIndexOf("/") + 1,
    siteAddress.length
  );

  return (
    <>
      <Container onClick={toggleDialog}>
        <ImageContainer>
          <Img
            src={details.image}
            alt="apple"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </ImageContainer>

        <h4>{details.name}</h4>

        <Description>{details.description && details.description}</Description>
        <Price>GHS {details.price && details.price}</Price>
      </Container>
      <Dialog
        open={dialog}
        fullScreen
        fullWidth
        onClose={toggleDialog}
        style={{ background: "#F5F8FD" }}
      >
        <DialogTitle style={{ background: "#F5F8FD" }}>
          <div
            style={{
              display: "flex",
              lineHeight: "50px",
              background: "#F5F8FD",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <ButtonContainer onClick={toggleDialog}>
              <div style={{ display: "flex" }}>
                <ArrowBackIos style={{ cursor: "pointer" }} />
                <Title style={{ cursor: "pointer" }}>Back</Title>
              </div>
            </ButtonContainer>
            <Hidden only={["xs", "sm"]}>
              <div
                style={{
                  display: finalUrl === "shopPreview" ? "flex" : "none",
                }}
              >
                <Button
                  onClick={handelProductEdit}
                  style={{
                    marginRight: "10px",
                    background: "#31BDF4",
                    color: "white",
                    width: "100px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={handelProductDelete}
                  style={{
                    marginRight: "10px",
                    background: "#EB5757",
                    color: "white",
                    width: "100px",
                  }}
                >
                  Delete
                </Button>
              </div>
            </Hidden>
            <Hidden only={["md", "lg", "xl"]}>
              <div
                style={{
                  display: finalUrl === "shopPreview" ? "flex" : "none",
                }}
              >
                <Button
                  onClick={handelProductEdit}
                  style={{
                    background: "#31BDF4",
                    color: "white",
                    width: "60px",
                    fontSize: "10px",
                    marginRight: "5px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{
                    background: "#EB5757",
                    color: "white",
                    width: "60px",
                    fontSize: "10px",
                  }}
                  onClick={handelProductDelete}
                >
                  Delete
                </Button>
              </div>
            </Hidden>
          </div>
        </DialogTitle>

        {payDialog ? (
          <BreadCrumbs details={paymentDetail} />
        ) : (
          <ProductDescription
            updateDialog={(value) => payDialogUpdate(value)}
            updateValue={(data) => paymentData(data)}
            data={details}
            shopNameData={props.shopNameData}
          />
        )}
      </Dialog>
      <Dialog
        open={confirmShow}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Product Delete Confirmation...
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} background="#31BDF4" slim width="100px">
            No
          </Button>
          <Button
            onClick={handleProductDeleteYes}
            background="#EB5757"
            slim
            width="100px"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Product;
