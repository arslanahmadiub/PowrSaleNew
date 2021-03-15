import { Dialog, DialogTitle } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import BreadCrumbs from "./BreadCrumbs";
import ProductDescription from "./ProductDescription";

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

  let [payDialog, setPayDialog] = useState(false);

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
            }}
          >
            <ButtonContainer onClick={toggleDialog}>
              <div style={{ display: "flex" }}>
                <ArrowBackIos style={{ cursor: "pointer" }} />
                <Title style={{ cursor: "pointer" }}>Back</Title>
              </div>
            </ButtonContainer>
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
    </>
  );
};

export default Product;
