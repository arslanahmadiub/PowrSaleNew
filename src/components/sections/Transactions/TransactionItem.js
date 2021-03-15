import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { ExpandLess, ExpandMore, FileCopy } from "@material-ui/icons";
import { Button as AntButton, Modal, Space, Typography } from "antd";
import Styled from "styled-components";
import Button from "../../CustomComponents/Button";
import Input from "../../CustomComponents/Input";
import { useSelector, useDispatch } from "react-redux";
import { reCallTransisation, showCodeBox } from "../../../action/walletAction";
import Alert from "@material-ui/lab/Alert";

import { updateDeliveryStatus } from "../../../services/transistionServices";

const FlexContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    letter-spacing: 0.5px;
    @media (min-width: 960px){
        
    }
`;

const Title = Styled.div`
    font-weight: 600;
    color: #010101;
    font-size: 16px;
    letter-spacing: 0.5px;
`;
const Description = Styled.div`
    font-weight: normal;
    color: #979FAA;
    font-size: 18px;
    letter-spacing: 0.5px;
    @media (max-width: 960px){
        margin: 15px 0;
        font-size: 12px;
    }
`;
const Amount = Styled.div`
    font-weight: 600;
    color: #010101;
    font-size: 16px;
    letter-spacing: 0.5px;
`;
const Container = Styled.div`

`;
const DateRow = Styled.div`
    font-weight: normal;
    color: #979FAA;
    font-size: 14px;
    letter-spacing: 0.5px;
    position: relative;
    top: 5px;
    margin-left: 25px;
`;

const TransactionId = Styled.div`
    color: #F18F6C;
    fontSize: 14px;
    fontWeight: 600; 
    padding: 12px 0;
`;
const TransactionStatus = Styled.div`
    color: #31BDF4;
    font-size: 14px;
    right: 10px;
    padding: 12px 0;
`;

export default function TranstionItem(props) {
  const [show, toggleShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [customerCode, setCustomerCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonVisiblity, setButtonVisiblity] = useState(false);
  const functionRecall = useSelector((state) => state.wallet.transaction);

  const dispatch = useDispatch();
  function primaryAction() {
    if (props.history) {
    } else {
      setShowModal(!showModal);
    }
  }

  useEffect(() => {
    dispatch(showCodeBox(false));
  }, []);

  let handelCustomerCode = (e) => {
    setCustomerCode(e.target.value);
  };

  let userToken = localStorage.getItem("token");

  let updateStatusService = async () => {
    let dataObject = {
      txID: data.id,
      status: "completed",
      customer_code: customerCode,
    };
    setErrorMessage(null);
    try {
      let { data } = await updateDeliveryStatus(dataObject, userToken);

      if (data.Success) {
        dispatch(showCodeBox(false));
        setErrorMessage(
          <Alert variant="filled" severity="success">
            {data.Message}
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);

          dispatch(reCallTransisation(!functionRecall));
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            {error.response.data.Message}
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    }
  };

  let handelCompleteOrder = () => {
    updateStatusService();
  };

  const data = props.data;

  let handelExpand = () => {
    if (data && data.amount.toString().charAt(0) === "+") {
      setButtonVisiblity(false);
    } else {
      setButtonVisiblity(true);
    }
    dispatch(showCodeBox(false));
  };

  let toggleShowFunction = () => {
    toggleShow(!show);
    handelExpand();
  };
  const showCodeBoxValue = useSelector((state) => state.wallet.codeBoxShow);
  return !data ? (
    <></>
  ) : (
    <Container>
      <FlexContainer onClick={toggleShowFunction} style={{ cursor: "pointer" }}>
        <FlexContainer>
          <FileCopy
            style={{ height: "20px", width: "20px", marginRight: "10px" }}
          />
          <Title>{data.title && data.title}</Title>
        </FlexContainer>
        <Hidden smDown>
          <Description>{data.description && data.description}</Description>
        </Hidden>
        <FlexContainer>
          <Amount>{data.amount && data.amount}</Amount>
          <div>
            {show ? (
              <ExpandLess
                style={{
                  height: "20px",
                  width: "20px",
                  marginLeft: "10px",
                  color: "#979FAA",
                }}
                onClick={handelExpand}
              />
            ) : (
              <ExpandMore
                style={{
                  height: "20px",
                  width: "20px",
                  marginLeft: "10px",
                  color: "#979FAA",
                }}
                onClick={handelExpand}
              />
            )}
          </div>
        </FlexContainer>
      </FlexContainer>
      <DateRow>
        {data.date && data.date} at {data.time && data.time}
      </DateRow>
      <Hidden mdUp>
        <Description>{data.description && data.description}</Description>
      </Hidden>

      <div style={{ display: show ? "block" : "none", marginLeft: "25px" }}>
        <FlexContainer>
          <TransactionId>{data.id && data.id}</TransactionId>
          <TransactionStatus>{data.status && data.status}</TransactionStatus>
        </FlexContainer>

        <Space>
          <Button
            onClick={primaryAction}
            size="large"
            outlined={
              data.status === "Pending" || data.status === "Cancelled"
                ? true
                : false
            }
            disable={
              data.status === "Pending" || data.status === "Cancelled"
                ? true
                : false
            }
          >
            {props && props.primaryButtonText}
          </Button>
          <div
            style={{
              display:
                props.history ||
                data.status === "Pending" ||
                showCodeBoxValue === false
                  ? "none"
                  : "flex",

              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "50px", marginTop: "10px" }}>
              <Input
                type="text"
                placeholder="Enter Code from customer"
                onChange={handelCustomerCode}
                height="52px"
                width="125%"
              />
            </div>
            <div style={{ marginLeft: "70px" }}>
              <Button
                size="large"
                type="secondary"
                onClick={handelCompleteOrder}
                background="#1AB4B3"
              >
                Submit
              </Button>
            </div>
          </div>
        </Space>
        <br />
        {errorMessage}
        <UpdateTransaction
          data={data}
          showModal={showModal}
          setShowModal={setShowModal}
          closeModel={() => setShowModal(false)}
          buyer={buttonVisiblity}
        />
      </div>
    </Container>
  );
}

export function UpdateTransaction({
  data,
  showModal,
  setShowModal,
  closeModel,
  buyer,
}) {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const functionRecall = useSelector((state) => state.wallet.transaction);

  const dispatch = useDispatch();

  let userToken = localStorage.getItem("token");

  let changeOrderState = async (transStatus) => {
    dispatch(showCodeBox(false));
    updateStatusService(transStatus);
  };

  let completedOrderFunction = async () => {
    if (buyer) {
      await updateStatusService("completed");
    } else {
      dispatch(showCodeBox(true));
      closeModel();
    }
  };

  let updateStatusService = async (status) => {
    let dataObject = {
      txID: data.id,
      status: status,
      customer_code: "249156",
    };
    setErrorMessage(null);
    try {
      let { data } = await updateDeliveryStatus(dataObject, userToken);

      if (data.Success) {
        setErrorMessage(
          <Alert variant="filled" severity="success">
            {data.Message}
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
          closeModel();
          dispatch(reCallTransisation(!functionRecall));
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            {error.response.data.Message}
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
          closeModel();
          dispatch(reCallTransisation(!functionRecall));
        }, 2000);
      }
    }
  };

  const { Title } = Typography;

  return (
    <React.Fragment>
      <Modal
        title="Update Transaction Status"
        visible={showModal}
        centered
        closable
        destroyOnClose={true}
        onCancel={() => setShowModal(false)}
        confirmLoading={loading}
        footer={null}
      >
        <Space
          size="large"
          align="center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <AntButton
            onClick={() => changeOrderState("shipped")}
            style={{
              background: "#F18F6C",
              width: "260px",
              height: "40px",
              color: "white",
              fontSize: "18px",
              marginBottom: "25px",
            }}
          >
            Shipped
          </AntButton>
          <AntButton
            onClick={() => changeOrderState("delivered")}
            style={{
              background: "#31BDF4",
              width: "260px",
              height: "40px",
              color: "white",
              fontSize: "18px",
              marginBottom: "25px",
            }}
          >
            Delivered
          </AntButton>
          <AntButton
            onClick={() => changeOrderState("cancelled")}
            style={{
              background: "#D26665",
              width: "260px",
              height: "40px",
              color: "white",
              fontSize: "18px",
              marginBottom: "25px",
            }}
          >
            Cancel Order
          </AntButton>
          <AntButton
            onClick={completedOrderFunction}
            style={{
              background: "#008b00",
              width: "260px",
              height: "40px",
              color: "white",
              fontSize: "18px",
              marginBottom: "25px",
            }}
          >
            Complete Order
          </AntButton>
          <AntButton
            style={{
              display: "none",
            }}
          >
            Cancel Order
          </AntButton>
        </Space>

        <Title level={4} type="danger">
          {errorMessage}
        </Title>
      </Modal>
    </React.Fragment>
  );
}
