import React from "react";
import Styled from "styled-components";
import ProductDetails from "./ProductDetails";
import PaymentForm from "../../../Forms/PaymentForm";
import { Breadcrumbs } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import ShippingDetail from "./ShippingDetail";
import PaymentDetails from "./PaymentDetails";

const BreadCrumbItem = Styled.a`
    font-size: 30px;
    font-weight: 700;
    color: ${(p) => (p.active ? "#010101" : "#979FAA")};
    //display: ${(p) => (p.step > p.index ? "none" : "")};
    text-decoration: none;
    &:hover{
        text-decoration: none;
    };
    @media (max-width: 960px){
        font-size: 12px;
    }
`;

const BreadCrumbsRow = Styled(Breadcrumbs)`
    background: transparent;
    padding: 15px 0 30px 0;
`;

const Container = Styled.div`
    padding: 0 50px 15px 50px;
    background: #F5F8FD;
    @media (max-width: 960px){
        padding: 0 10px 15px 10px;
    }
`;

const BreadCrumbs = (props) => {
  const [step, setStep] = React.useState(0);
  const seleectedStep = (index) => {
    switch (index) {
      case 0:
        return (
          <ProductDetails
            details={props.details}
            update={(value) => handelUpdate(value)}
          />
        );
      case 1:
        return (
          <ShippingDetail
            update={(value) => handelUpdate(value)}
            productIdDetail={props.details}
          />
        );
      case 2:
        return <PaymentDetails />;
      default:
        return null;
    }
  };
  let handelUpdate = (value) => {
    setStep(value);
  };

  const changeFocus = (index) => (event) => {
    event.stopPropagation();
    setStep(index);
  };
  return (
    <Container>
      <BreadCrumbsRow separator={<ArrowRight fontSize="large" />}>
        <BreadCrumbItem
          href="#"
          onClick={changeFocus(0)}
          active={step === 0}
          current={step}
          index={0}
        >
          Details
        </BreadCrumbItem>
        <BreadCrumbItem
          href="#"
          onClick={changeFocus(1)}
          active={step === 1}
          current={step}
          index={0}
        >
          Shipping
        </BreadCrumbItem>
        <BreadCrumbItem
          href="#"
          onClick={changeFocus(2)}
          active={step === 2}
          current={step}
          index={0}
        >
          Payment
        </BreadCrumbItem>
      </BreadCrumbsRow>
      {seleectedStep(step)}
    </Container>
  );
};

export default BreadCrumbs;
