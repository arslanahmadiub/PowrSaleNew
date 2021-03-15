import { Dialog, DialogTitle } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import Styled from "styled-components";
import BreadCrumbs from "./BreadCrumbs";

const Container = Styled.div`
    cursor: pointer;
`;
const ImageContainer = Styled.div`
    height: 170px;
    width: 170px;
    background: #F3F3F3;
    border-radius: 15px;
`;
const Img = Styled.img`
    height: 150px;
    width: 150px;
    margin: auto;
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
  const { description, image, price, tiles, delivery, name } = props.details;

  let details = props.details;

  const toggleDialog = (event) => setDialog(!dialog);

  return (
    <>
      <Container onClick={toggleDialog}>
        <ImageContainer>
          <Img src={image} alt="apple" />
        </ImageContainer>

        <Description>{description && description}</Description>
        <Price>$ {price && price}</Price>
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
              <ArrowBackIos />
              <Title>Back</Title>
            </ButtonContainer>
          </div>
        </DialogTitle>
        <BreadCrumbs details={details} />
      </Dialog>
    </>
  );
};

export default Product;
