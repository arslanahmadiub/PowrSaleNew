import React from "react";
import Grid from "@material-ui/core/Grid";
import companyLogo from "../../../../assets/images/company-logo.png";
import Styled from "styled-components";
import Button from "../../../CustomComponents/Button";
import ShopBrand, { ShopBrandMobile } from "./ShopBrand";
import { Security } from "@material-ui/icons";
import { Hidden } from "@material-ui/core";
import CustomLink from "../../../CustomComponents/CustomLink";

const Container = Styled.div`
    background: #F5F8FD;
    padding: 0 15px 0px 15px;
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
// const ContactLabel = Styled.div`
//     font-size: 14px;
//     color: #979FAA;
// `
// const TermsAndConditions = Styled.div`
//     font-size: 12px;
//     color: #31BDF4;
//     font-weight: ;
// `

const TiledImage = Styled.img`
    height: 100px;
    width: 100px;
    background: #FFFFFF;
    border-radius: 15px;
    margin: auto;
    padding: 10px;
    @media (max-width: 960px){
        height: 80px;
        width: 80px;
        padding: 5px;
    }
`;

const CoverImage = Styled.img`
    height: 330px;
    width: 300px;
    background: #FFFFFF;
    border-radius: 15px;
    //margin: 0 0 0 5px;
    padding: 15px;
    @media (max-width: 960px){
        height: 250px;
        width: 220px;
    }
`;

const CopyRight = Styled.div`
    padding: 15px 0;
    border-top: 0.5px solid #979FAA;
    text-align: center;
`;

const ProductDetails = (props) => {
  const { description, image, price, tiles, delivery, name } = props.details;

  return (
    <Container>
      <div>
        <Grid container direction="row" spacing={0}>
          <Grid item xs={4} sm={2} md={2}>
            <Grid container direction="column" spacing={0}>
              <Grid item>
                <TiledImage src={tiles.first_tile} alt="First tile" />
              </Grid>
              <Grid item>
                <TiledImage src={tiles && tiles.first_tile} alt="First tile" />
              </Grid>
              <Grid item>
                <TiledImage src={tiles.first_tile} alt="First tile" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8} md={4}>
            <CoverImage src={image && image} alt="First tile" />
          </Grid>
          <Grid item xs={12} md={5}>
            <DetailsContainer>
              <Grid container direction="column" spacing={0}>
                <Grid item xs={12}>
                  <ProductName>{name && name}</ProductName>
                </Grid>
                <Grid item xs={12}>
                  <Description>{description && description}</Description>
                </Grid>
                <Grid item xs={12}>
                  <Price>GHS {price && price}</Price>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
                <Grid container direction="row">
                  <Grid item xs={12} sm={4}>
                    <Button>Buy Now</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Delivery>Delivery terms</Delivery>
              </Grid>
              <Grid item xs={12}>
                <Description>{delivery && delivery}</Description>
              </Grid>
            </DetailsContainer>
          </Grid>
        </Grid>
      </div>

      <div style={{ margin: "30px 0", borderTop: "0.5px solid #979FAA" }}>
        <Hidden smDown>
          <ShopBrand
            logo={companyLogo}
            name={"GoPare"}
            slogan={"Electronic"}
            shopid={"#3455354"}
          />
        </Hidden>
        <Hidden mdUp>
          <ShopBrandMobile
            logo={companyLogo}
            name={"GoPare"}
            slogan={"Electronic"}
            shopid={"#3455354"}
          />
        </Hidden>
      </div>

      <Hidden smDown>
        <CopyRight>
          <Grid container direction="row" spacing={5}>
            <Grid item xs={6} md={2}>
              <CustomLink>Terms {"&"} </CustomLink>
              <CustomLink>Conditions</CustomLink>
            </Grid>
            <Grid item xs={12} md={7}>
              <Security style={{ color: "#31BDF4", lineHeight: "16px" }} /> This
              purchase is protected by
              <a href="https://app.powrsale.com/" target="_blank">
                Powrsale.com.
              </a>
              Your funds are escrow protected
            </Grid>
            <Grid item xs={6} md={3}>
              <a href="https://app.powrsale.com" target="_blank">
                Create your Profile
              </a>
            </Grid>

            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </CopyRight>
      </Hidden>

      <Hidden mdUp>
        <CopyRight>
          <Grid container direction="row" spacing={5}>
            <Grid item xs={12} md={7}>
              <Security style={{ color: "#31BDF4", lineHeight: "16px" }} /> This
              purchase is protected by
              <a href="https://app.powrsale.com" target="_blank">
                Powrsale.com.
              </a>
              Your funds are escrow protected
            </Grid>

            <Grid item xs={6} md={2}>
              <CustomLink>Terms {"&"} </CustomLink>
              <CustomLink>Conditions</CustomLink>
            </Grid>

            <Grid item xs={6} md={3}>
              <a href="https://app.powrsale.com" target="_blank">
                Create your Profile
              </a>
            </Grid>

            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </CopyRight>
      </Hidden>
    </Container>
  );
};
export default ProductDetails;
