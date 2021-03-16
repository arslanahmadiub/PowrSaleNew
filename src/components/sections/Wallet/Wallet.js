import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { Button as AntButton } from "antd";
import { Grid, Hidden } from "@material-ui/core";

import Button from "../../CustomComponents/Button";
import BannerContainer from "../../CustomComponents/BannerContainer";
import BulletedText from "../../CustomComponents/BulletedText";
import CircularProgress from "../../CustomComponents/CircularProgress";
import WithdrawalForm from "../../Forms/WithdrawalForm";
import CreditCard, { MoMoCard } from "./CreditCard";
import HorizontalScrollingContainer from "../../CustomComponents/HorizontalScrollingContainer";
import { Row, Col, Space, Form } from "antd";
import { WalletContext } from "../../../contexts/WalletContext";
import DesktopHeaderRow from "../../CustomComponents/DesktopHeaderRow";
import TwinInputSelect from "../../CustomComponents/TwinInputSelect";
import { DataContext } from "../../../contexts/DataContext";
import { getWallet } from "../../../services/walletServices";
import { cashOut } from "../../../services/walletServices";
import { Spin } from "antd";
import CompleteProfile from "../Profile/CompleteProfile";
import Alert from "@material-ui/lab/Alert";
import { deletWallet } from "../../../services/walletServices";

const Title = Styled.div`
    font-size: 22px;
    font-weight: 500;
    margin: 20px 0;
`;

const NewCardButton = Styled.div`
    width: 300px;
    height: 170px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: #979FAA;
    background: #fff;
    border-radius: 12px;
    cursor: pointer;
`;

const Wallet = (props) => {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [showWithDrawlForm, setShowWithDrawlForm] = useState(false);
  const [stage, setStage] = React.useState(0);
  const [type, setType] = React.useState("");
  // const walletCard = useSelector((state) => state.wallet.card);
  const [walletErrorMessage, setWalletErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [walletId, setWalletId] = useState(null);
  const [cashAmount, setCashAmount] = useState("");
  const [cashLoading, setCashLoading] = useState(false);
  const [walletCard, setWalletCard] = useState([]);
  const [escrowAmount, setEscrowAmount] = useState("");
  const [available, setAvailable] = useState("");
  const [percentValue, setPercentValue] = useState(null);
  function advanceStage() {
    setSelectedCard(null);
    setShowWithDrawlForm(false);
    if (stage < 3) {
      setStage(stage + 1);
    }
  }

  let findPercentageofCircularProgressBar = () => {
    let escrow = parseInt(escrowAmount);
    let avail = parseInt(available);

    let sum = escrow + avail;

    if (sum !== 0) {
      let percent = avail / sum;

      let percent2 = percent * 100;

      setPercentValue(Math.round(percent2));
    }
  };

  function selectThis(data) {
    setSelectedCard(data);
    setStage(0);
    setWalletId(data.id);
  }
  const { balance, cards } = React.useContext(WalletContext);

  const { main, escrow } = balance || {};

  function cashoutSomeMoney(values) {}

  const percent = Math.round(
    (100 * Number(main)) / (Number(main) + Number(escrow))
  );

  const { currencies } = React.useContext(DataContext);

  let walletError = (val) => {
    setWalletErrorMessage(val);
  };
  let userToken = localStorage.getItem("token");

  let handelCashout = async () => {
    let form_data = new FormData();
    form_data.set("wallet_id", walletId);
    form_data.set("amount", cashAmount);

    try {
      setCashLoading(true);
      setErrorMessage(null);

      let { data } = await cashOut(form_data, userToken);

      setCashLoading(false);
      setCashAmount("");
      setErrorMessage(
        <Alert variant="filled" severity="success">
          Cash out successfull...
        </Alert>
      );
      setTimeout(() => {
        setErrorMessage(null);
        getWalletData();
      }, 3000);
    } catch (error) {
      setCashLoading(false);
      if (error.response.data.Message) {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            {error.response.data.Message}
          </Alert>
        );
      } else {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            Transaction failed...
          </Alert>
        );
      }

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  let changeCashAmount = (e) => {
    const re = /^[0-9.\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setCashAmount(e.target.value);
    }
  };

  const [walletLoading, setWalletLoading] = useState(false);

  let getWalletData = async () => {
    setWalletLoading(true);
    let { data } = await getWallet(userToken);

    let walletArray = [];
    if (data.Success) {
      data.Details.Wallets.map((item) => {
        let newWalletData = {
          name: item.mobile_money_name,
          country: "Ghana",
          number: item.mobile_money_number,
          date: "09/2024",
          type: "momo",
          id: item.id,
          network: item.momo_network,
        };
        walletArray.push(newWalletData);
      });
      setEscrowAmount(data.Details.escrow);
      setAvailable(data.Details.available);
      setWalletCard(walletArray);
      setWalletLoading(false);
    }
    setWalletLoading(false);
  };

  const [walletCallData, setWalletCallData] = useState(false);
  useEffect(() => {
    getWalletData();
  }, []);

  useEffect(() => {
    findPercentageofCircularProgressBar();
  }, [available]);

  useEffect(() => {
    walletError();
  }, [props.error]);

  let walletCall = (value) => {
    setWalletCallData(value);
    setStage(0);
  };

  useEffect(() => {
    getWalletData();
  }, [walletCallData]);

  useEffect(() => {
    walletCall();
  }, [props.walletFunctionCall]);

  let handelWithdrawaShow = () => {
    setShowWithDrawlForm(true);
  };

  let handelCardDelete = async () => {
    setShowWithDrawlForm(false);
    try {
      let { data } = await deletWallet(selectedCard.id);
      if (data.Success) {
        setSuccessMessage(
          <Alert variant="filled" severity="success">
            Wallet deleted successfully...
          </Alert>
        );
        setSelectedCard(null);
        getWalletData();
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage("Some thing went wrong or server error...");
    }
  };

  return (
    <>
      <CompleteProfile />
      <Row gutter={[0, 8]}>
        <DesktopHeaderRow title="Wallet" />
      </Row>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <BannerContainer>
            <Hidden only={["md", "lg", "xl"]}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Grid container direction="column">
                    <BulletedText
                      title={"Available"}
                      value={`GHS ${available ? available : "0"}`}
                      primary
                    />

                    <BulletedText
                      title={"Funds in escrow"}
                      value={`GHS ${escrowAmount ? escrowAmount : "0"}`}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <CircularProgress
                    thickness={10}
                    radius={50}
                    percent={isNaN(percentValue) ? 0 : percentValue}
                  />
                </Grid>
              </Grid>
            </Hidden>
            <Hidden only={["xs", "sm"]}>
              <BulletedText
                title={"Available"}
                value={`GHS ${available ? available : "0"}`}
                primary
              />

              <BulletedText
                title={"Funds in escrow"}
                value={`GHS ${escrowAmount ? escrowAmount : "0"}`}
              />

              <CircularProgress
                thickness={10}
                radius={50}
                percent={isNaN(percentValue) ? 0 : percentValue}
              />
            </Hidden>
          </BannerContainer>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col span={24}>
          {walletLoading ? (
            <Space
              size="middle"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Spin size="large" />
            </Space>
          ) : null}

          <HorizontalScrollingContainer>
            {walletCard.map((card, index) => {
              return (
                <React.Fragment key={index}>
                  {card.type === "bank" && (
                    <span
                      onClick={() => selectThis(card)}
                      key={card.number + index + card.number}
                    >
                      <MoMoCard
                        selected={
                          selectedCard && selectedCard.number === card.number
                        }
                        data={card}
                      />
                    </span>
                  )}
                  {card.type === "momo" && (
                    <span
                      onClick={() => selectThis(card)}
                      key={card.number + index + card.number}
                    >
                      <CreditCard
                        selected={
                          selectedCard && selectedCard.number === card.number
                        }
                        data={card}
                      />
                    </span>
                  )}
                </React.Fragment>
              );
            })}

            <NewCardButton key="nmsi8923nv-2092309" onClick={advanceStage}>
              <div style={{ top: "40%", position: "relative" }}>
                Add new payout wallet
              </div>
            </NewCardButton>
          </HorizontalScrollingContainer>
        </Col>
      </Row>
      {successMessage && successMessage}
      {selectedCard && (
        <Row gutter={[16, 24]}>
          <Space size="large">
            <Button onClick={handelWithdrawaShow} faded={!showWithDrawlForm}>
              Withdraw
            </Button>
            <Button
              background={showWithDrawlForm ? "#F6E5E4" : "#EB5757"}
              faded={showWithDrawlForm}
              color="#fff"
              onClick={handelCardDelete}
            >
              Delete
            </Button>
          </Space>
        </Row>
      )}

      {showWithDrawlForm && (
        <React.Fragment>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <Title>Withdrawal Amount</Title>
              <span style={{ fontSize: "18px", color: "red" }}>
                {errorMessage}
              </span>
            </Col>
          </Row>

          <Row gutter={[0, 8]}>
            <Col span={{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <Form onFinish={cashoutSomeMoney}>
                <Col span={24}>
                  <Form.Item>
                    <TwinInputSelect
                      list={currencies}
                      placeholder="Please input the amount to withdraw"
                      onChange={changeCashAmount}
                      type="text"
                      value={cashAmount}
                    />
                  </Form.Item>
                </Col>
                <Row gutter={[0, 8]}>
                  <Col span={12}>
                    <Form.Item>
                      {/* <Button onClick={handelCashout}>Cashout</Button> */}

                      <AntButton
                        type="primary"
                        loading={cashLoading}
                        onClick={handelCashout}
                        disabled={cashAmount.length > 0 ? false : true}
                        style={{
                          background:
                            cashAmount.length > 0 ? "#31BDF4" : "#A9A9A9",
                          height: "50px",
                          color: "white",
                          borderRadius: "5px",
                          border: "none",
                          fontWeight: "bold",
                        }}
                      >
                        CASHOUT
                      </AntButton>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Button onClick={() => setSelectedCard(null)}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </React.Fragment>
      )}

      {stage > 0 && (
        <>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Title>Payout Options</Title>
            </Col>
          </Row>

          <Row gutter={[16, 24]}>
            <Space size="large">
              <Button
                onClick={() => {
                  setType("momo");
                  advanceStage();
                }}
                faded={type !== "momo"}
              >
                Mobile Money
              </Button>
              {/* <Button
                onClick={() => {
                  setType("bank");
                  advanceStage();
                }}
                faded={type !== "bank"}
              >
                Bank
              </Button> */}
            </Space>
          </Row>
        </>
      )}

      {stage > 1 && (
        <>
          <Row gutter={[0, 16]}>
            <h3 style={{ color: "red" }}>
              {walletErrorMessage !== null ? walletErrorMessage : ""}
            </h3>
            <Col span={24}>
              <WithdrawalForm
                externalFunction={setStage}
                type={type}
                error={(value) => walletError(value)}
                walletFunctionCall={(value) => walletCall(value)}
                walletFunctionCallData={walletCallData}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Wallet;
