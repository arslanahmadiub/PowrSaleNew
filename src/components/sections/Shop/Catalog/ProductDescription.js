import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import companyLogo from "../../../../assets/images/company-logo.png";
import Styled from "styled-components";
import Button from "../../../CustomComponents/Button";

import ShopBrand, { ShopBrandMobile } from "./ShopBrand";
import { Security } from "@material-ui/icons";
import { Hidden } from "@material-ui/core";
import CustomLink from "../../../CustomComponents/CustomLink";
import { getProductDetail } from "../../../../services/shopServices";
import { imageEndPoint } from "../../../../config.json";
import move from "lodash-move";
import { useHistory } from "react-router";

import { useSelector } from "react-redux";

const Container = Styled.div`
    background: #F5F8FD;
   
    min-height: 100vh;
`;
const DetailsContainer = Styled.div`
    background: #F5F8FD;
    padding: 0px 0;
    min-height: 50vh;
`;

const ProductName = Styled.div`
    font-size: 30px;
    font-weight: 600;
    margin: 20px 0;
`;
const Description = Styled.div`
    font-size: 14px;
    font-weight: normal;
`;
const Price = Styled.div`
    font-size: 20px;
    font-weight: 600;
    margin: 30px 0;
`;
const Delivery = Styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
`;

const TiledImage = Styled.img`
   
    width: 100px;
    height:100px;
    object-fit: cover;
  
   background: #FFFFFF;
    border-radius: 15px;
    margin: auto;
  
    @media (max-width: 960px){
        
        width: 80px;
        height:80px;
    object-fit: cover;
    }
`;

const CoverImage = Styled.img`
 
    width:300px;
   height:300px;
   object-fit: cover;
   background: #FFFFFF;
    border-radius: 15px;
    //margin: 0 0 0 5px;

    @media (max-width: 960px){
      width:300px;
      height:300px;
      object-fit: cover;

    }
`;

const CopyRight = Styled.div`
    
    border-top: 0.5px solid #979FAA;
    text-align: center;
`;

export default function ProductDescription({
  description,
  image,
  price,
  tiles,
  delivery,
  name,
  data,
  ...props
}) {
  let handelBuyNow = () => {
    props.updateDialog(true);
    props.updateValue(newData);
  };

  const [productDetail, setproductDetail] = useState(null);
  const [sideUrl, setsideUrl] = useState(null);
  const shopIds = useSelector((state) => state.shopPreview.shopIdCollections);
  const [userWithOwnShop, setUserWithOwnShop] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getDetailData();
  }, []);

  useEffect(() => {
    findShopId();
  }, [productDetail]);

  // if (productDetail !== null && productDetail.length > 0) {
  //
  // }

  let findShopId = () => {
    if (productDetail !== null && productDetail.length > 0) {
      let result = shopIds.filter(
        (item) => item.shop === productDetail[0].shop_id
      );
      if (result.length > 0) {
        setUserWithOwnShop(true);
      } else {
        setUserWithOwnShop(false);
      }
    }
  };

  let getDetailData = async () => {
    let result = await getProductDetail(data.productId);

    setproductDetail(result.data.Details);

    let sideImageUrl = [];

    result.data.Details[0].Images.map((item, index) => {
      sideImageUrl.push(imageEndPoint + item.image);
    });
    setsideUrl(sideImageUrl);
  };
  let newData = {
    delivery: "24hrs",
    description: productDetail !== null ? productDetail[0].description : "",
    price: productDetail !== null ? productDetail[0].price : "",
    productId: productDetail !== null ? productDetail[0].product : "",
    shop_id: productDetail !== null ? productDetail[0].shop_id : "",
    name: productDetail !== null ? productDetail[0].product_name : "",
  };

  const [userAvailability, setUserAvailability] = useState(false);

  let verifyUser = () => {
    let user = localStorage.getItem("token");
    if (user !== null && user.length > 0) {
      setUserAvailability(true);
    } else {
      setUserAvailability(false);
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);

  let handelTiledImage = (item, index) => {
    let newArray = [...sideUrl];

    let arr = move(newArray, index, 0);
    setsideUrl(arr);
  };

  let handelSignUp = () => {
    let url = window.location.href;
    localStorage.setItem("shopLink", url);

    history.push({
      pathname: "/",
      search: "false",
    });
  };
  let handelLogin = () => {
    let url = window.location.href;
    localStorage.setItem("shopLink", url);

    history.push({
      pathname: "/",
      search: "true",
    });
  };

  return (
    <Container>
      <Hidden only={["xs", "sm"]}>
        <div>
          <Grid
            container
            direction="row"
            spacing={0}
            style={{ padding: "15px" }}
          >
            <Grid item xs={4} sm={2} md={2}>
              <Grid container direction="column" spacing={2}>
                {sideUrl !== null
                  ? sideUrl.map((item, index) => {
                      if (index === 0) {
                        return null;
                      } else {
                        return (
                          <Grid item key={index}>
                            <TiledImage
                              src={item}
                              style={{ cursor: "pointer" }}
                              onClick={() => handelTiledImage(item, index)}
                            />
                          </Grid>
                        );
                      }
                    })
                  : null}
              </Grid>
            </Grid>
            <Grid item xs={8} md={4}>
              {sideUrl !== null && sideUrl.length > 0 ? (
                <CoverImage src={sideUrl[0]} alt="First tile" />
              ) : null}
            </Grid>
            <Grid item xs={12} md={5}>
              <DetailsContainer style={{ marginTop: "-6%" }}>
                <Grid container direction="column" spacing={0}>
                  <Grid item xs={12}>
                    <ProductName>{data.name}</ProductName>
                  </Grid>
                  <Grid item xs={12}>
                    <Description>{data.description}</Description>
                  </Grid>
                  <Grid item xs={12}>
                    <Price>GHS {data.price}</Price>
                  </Grid>
                  <Grid item xs={12} sm={2}></Grid>
                  <Grid container direction="row">
                    <Grid item xs={12} sm={4}>
                      {userAvailability && userWithOwnShop === false ? (
                        <Button onClick={handelBuyNow}>Buy Now</Button>
                      ) : (
                        <Button disable faded>
                          Buy Now
                        </Button>
                      )}
                    </Grid>
                    {/* <Button onClick={handelBuyNow}>Buy Now</Button> */}
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    {userAvailability ? null : (
                      <p style={{ fontSize: "15px" }}>
                        Please{" "}
                        <span
                          style={{ color: "#31BDF4", cursor: "pointer" }}
                          onClick={handelLogin}
                        >
                          {" "}
                          Login
                        </span>{" "}
                        Or{" "}
                        <span
                          style={{ color: "#31BDF4", cursor: "pointer" }}
                          onClick={handelSignUp}
                        >
                          Create Account
                        </span>{" "}
                        To Buy This Product
                      </p>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Delivery>Delivery Applicable</Delivery>
                </Grid>
                <Grid item xs={12}>
                  {/* <Description>{delivery && delivery}</Description> */}
                  <Description>Yes, Price based on location</Description>
                </Grid>
              </DetailsContainer>
            </Grid>
          </Grid>
        </div>
      </Hidden>

      <Hidden only={["md", "lg", "xl"]}>
        <div>
          <Grid container direction="row" spacing={0}>
            <Grid
              item
              xs={12}
              md={4}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {sideUrl !== null && sideUrl.length > 0 ? (
                <CoverImage src={sideUrl[0]} alt="First tile" />
              ) : null}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={2}
              style={{
                display: "flex",
                width: "100%",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              {sideUrl !== null
                ? sideUrl.map((item, index) => {
                    if (index === 0) {
                      return null;
                    } else {
                      return (
                        <Grid item key={index}>
                          <TiledImage
                            src={item}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            onClick={() => handelTiledImage(item, index)}
                          />
                        </Grid>
                      );
                    }
                  })
                : null}
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                background: "#F5F8FD",
              }}
            >
              <DetailsContainer>
                <Grid
                  container
                  direction="column"
                  spacing={0}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12}>
                    {/* <ProductName>{name && name}</ProductName> */}
                    <ProductName>{data.name}</ProductName>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Description>{description && description}</Description> */}
                    <Description>{data.description}</Description>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Price>GHS {price && price}</Price> */}
                    <Price>GHS {data.price}</Price>
                  </Grid>
                  <Grid item xs={12} sm={2}></Grid>
                  <Grid
                    container
                    direction="row"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {userAvailability && userWithOwnShop === false ? (
                        <Button onClick={handelBuyNow}>Buy Now</Button>
                      ) : (
                        <Button disable faded>
                          Buy Now
                        </Button>
                      )}
                    </Grid>
                    {/* <Button onClick={handelBuyNow}>Buy Now</Button> */}
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    {userAvailability ? null : (
                      <p style={{ fontSize: "15px" }}>
                        Please{" "}
                        <span
                          style={{ color: "#31BDF4", cursor: "pointer" }}
                          onClick={handelLogin}
                        >
                          {" "}
                          Login
                        </span>{" "}
                        Or{" "}
                        <span
                          style={{ color: "#31BDF4", cursor: "pointer" }}
                          onClick={handelSignUp}
                        >
                          Create Account
                        </span>{" "}
                        To Buy This Product
                      </p>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Delivery>Delivery Applicable</Delivery>
                </Grid>
                <Grid item xs={12}>
                  <Description>Yes, Price based on location</Description>
                </Grid>
              </DetailsContainer>
            </Grid>
          </Grid>
        </div>
      </Hidden>

      <div style={{ borderTop: "0.5px solid #979FAA", background: "#F5F8FD" }}>
        <Hidden only={["xs", "sm"]}>
          <ShopBrand
            logo={
              productDetail !== null
                ? imageEndPoint + productDetail[0].Images[0].image
                : ""
            }
            name={props.shopNameData && props.shopNameData}
            slogan={data.shopBio}
            shopid={
              productDetail !== null ? "#" + productDetail[0].shop_id : ""
            }
          />
        </Hidden>
        <Hidden only={["md", "lg", "xl"]}>
          <ShopBrandMobile />
        </Hidden>
      </div>

      <Hidden smDown>
        <div
          style={{
            background: "#F5F8FD",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "2%",
            borderTop: "0.5px solid #979FAA",
          }}
        >
          <div>
            <p
              style={{
                color: "#31BDF4",
                fontSize: "16px",
                fontWeight: "500px",
                cursor: "pointer",
              }}
            >
              Terms & Conditions
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <Security style={{ color: "#31BDF4" }} />
            <p style={{ marginTop: "-2px", marginLeft: "10px" }}>
              This shop is powered by{" "}
              <a
                target="_blank"
                href="https://app.powrsale.com/"
                style={{
                  color: "#31BDF4",
                  fontSize: "16px",
                  fontWeight: "500px",
                  cursor: "pointer",
                }}
              >
                Powrsale.com
              </a>{" "}
              Your funds are escrow protected
            </p>
          </div>
          <div>
            <a
              target="_blank"
              href="https://app.powrsale.com/"
              style={{
                color: "#31BDF4",
                fontSize: "16px",
                fontWeight: "500px",
                cursor: "pointer",
              }}
            >
              Create your shop
            </a>
          </div>
        </div>
      </Hidden>

      <Hidden mdUp>
        <div
          style={{
            background: "#F5F8FD",
            display: "flex",

            width: "100%",
            padding: "2%",
            borderTop: "0.5px solid #979FAA",
          }}
        >
          <div style={{ display: "flex" }}>
            <Security style={{ color: "#31BDF4" }} />
            <p style={{ marginTop: "-2px", marginLeft: "10px" }}>
              This shop is powered by{" "}
              <a
                target="_blank"
                href="https://app.powrsale.com/"
                style={{
                  color: "#31BDF4",
                  fontSize: "16px",
                  fontWeight: "500px",
                  cursor: "pointer",
                }}
              >
                Powrsale.com
              </a>{" "}
              Your funds are escrow protected
            </p>
          </div>
        </div>
        <div
          style={{
            background: "#F5F8FD",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "2%",
          }}
        >
          <div>
            <p
              style={{
                color: "#31BDF4",
                fontSize: "16px",
                fontWeight: "500px",
                cursor: "pointer",
              }}
            >
              Terms & Conditions
            </p>
          </div>
          <div>
            <a
              target="_blank"
              href="https://app.powrsale.com/"
              style={{
                color: "#31BDF4",
                fontSize: "16px",
                fontWeight: "500px",
                cursor: "pointer",
              }}
            >
              Create your shop
            </a>
          </div>
        </div>
      </Hidden>
    </Container>
  );
}
