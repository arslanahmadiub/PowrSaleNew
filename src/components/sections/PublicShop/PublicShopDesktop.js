import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CompanyLogoImage from "../../../assets/images/company-logo.png";
import { Facebook, Instagram, Twitter, WhatsApp } from "@material-ui/icons";
import Styled from "styled-components";
import { imageEndPoint } from "../../../config.json";
const Container = Styled.div`
padding: 50px 30px;
border-radius: 0;
background: #F5F8FD;
min-height: 80%;
@media (max-width: 960px){
    padding: 20px 10px;
}
`;
const FlexContainer = Styled.div`
display: flex;
width: 100%;
justify-content:${(p) => (p.justify ? p.justify : "space-between")};
`;
const Brand = Styled.div`
    margin-top : -7px;
`;

const BrandName = Styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #010101;
`;

const BrandSlogan = Styled.div`
    font-size: 18px; 
    color: #979FAA;
    
`;

const ShopId = Styled.div`
    color: #31BDF4;
    font-size: 12px;
`;

const BrandBrief = Styled.div`
    font-size: 16px;
    color: #010101;
    padding: 15px 0 30px 0;
    display:flex;
    width:100vw;
`;

const ContactLabel = Styled.div`
    font-size: 14px;
    color: #979FAA;
    padding: 15px 0 0 0;
`;
const Contact = Styled.div`
    font-size: 16px;
    color: #010101;
    font-weight: 600;
    padding:  0 0 25px 0;
`;

const CompanyLogo = Styled.img`
    display: block;
    max-width:200px;
    max-height:200px;
    min-width:200px;
    min-height:200px;

margin-right:20px;
object-fit: cover;
    margin: 0 15px 0 0;  
    border-radius: 15px;  
`;

const PublicShopDesktop = (props) => {
  return (
    <>
      <div
        style={{
          borderBottom: "0.5px solid #979FAA",
        }}
      >
        <FlexContainer
          style={{ display: "flex", width: "90vw", overflow: "hidden" }}
        >
          <CompanyLogo
            src={
              props.data !== null ? imageEndPoint + props.data.shop_logo : ""
            }
          />
          <div>
            <FlexContainer
              justify="space-between"
              style={{ display: "flex", width: "50%", overFlow: "hidden" }}
            >
              <Brand>
                <BrandName>
                  {props.data !== null ? props.data.shop_name : ""}
                </BrandName>

                <div
                  style={{
                    display: "flex",
                    width: "70vw",
                    justifyContent: "space-between",
                  }}
                >
                  <BrandSlogan>
                    {props.data !== null ? props.data.business_type : ""}
                  </BrandSlogan>

                  <ShopId style={{ fontSize: "16px" }}>
                    Shop ID: {props.data !== null ? "#" + props.data.shop : ""}
                  </ShopId>
                </div>
              </Brand>
            </FlexContainer>
            <BrandBrief>
              {props.data !== null ? props.data.shop_bio : ""}
            </BrandBrief>

            <Grid
              container
              direction="row"
              spacing={1}
              style={{
                display: "flex",
                width: "100vw",
                justifyContent: "space-around",
                paddingRight: "20%",
                overflow: "hidden",
              }}
            >
              <Grid item xs={6} md={3}>
                <ContactLabel>Address</ContactLabel>

                <Contact>
                  {props.data !== null ? props.data.address : ""}
                </Contact>
              </Grid>
              <Grid item xs={6} md={3}>
                <ContactLabel>Phone</ContactLabel>

                <Contact>
                  {props.data !== null ? props.data.business_phone : ""}
                </Contact>
              </Grid>
              <Grid item xs={6} md={3}>
                <ContactLabel>Email</ContactLabel>

                <Contact>
                  {props.data !== null ? props.data.business_email : ""}
                </Contact>
              </Grid>
              <Grid item xs={6} md={3}>
                {props.data &&
                (props.data.facebook_link ||
                  props.data.instagram_link ||
                  props.data.twitter_link) ? (
                  <ContactLabel>Social</ContactLabel>
                ) : null}
                <Contact>
                  <FlexContainer style={{ width: "80px" }}>
                    {props.data && props.data.facebook_link ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          props.data &&
                          "https://www.facebook.com/" + props.data.facebook_link
                        }
                      >
                        <Facebook style={{ color: "black" }} />
                      </a>
                    ) : null}
                    {props.data && props.data.instagram_link ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          props.data &&
                          "https://www.instagram.com/" +
                            props.data.instagram_link
                        }
                      >
                        <Instagram style={{ color: "black" }} />
                      </a>
                    ) : null}
                    {props.data && props.data.twitter_link ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          props.data &&
                          "https://twitter.com/" + props.data.twitter_link
                        }
                      >
                        <Twitter style={{ color: "black" }} />
                      </a>
                    ) : null}
                  </FlexContainer>
                </Contact>
              </Grid>
            </Grid>
          </div>
        </FlexContainer>
      </div>
    </>
  );
};

export default PublicShopDesktop;
