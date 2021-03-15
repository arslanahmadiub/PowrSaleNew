import { Facebook, Instagram, Twitter, WhatsApp } from "@material-ui/icons";
import React from "react";
import Styled from "styled-components";
import { useSelector } from "react-redux";
import { imageEndPoint } from "../../../../config.json";

const Container = Styled.div`
padding: 50px 30px;
border-radius: 0;
`;
const FlexContainer = Styled.div`
display: flex;
justify-content: space-between;
@media (max-width: 960px){
        text-align: center;
        margin: auto;  
    }
`;

const BrandName = Styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #010101;
    @media (max-width: 960px){
        text-align: center;
        margin: auto;
        padding: 15px;  
    }
    
`;

const BrandSlogan = Styled.div`
    font-size: 18px; 
    color: #979FAA;
    @media (max-width: 960px){
        text-align: center;
        margin: auto; 
        padding: 15px; 
    }
    
`;

const ShopId = Styled.div`
    color: #31BDF4;
    font-size: 18px;
    font-weight: 600;
    margin: 15px 0;
    @media (max-width: 960px){
        text-align: center;
        margin: auto; 
        padding: 15px; 
    }

`;

const ContactLabel = Styled.div`
    font-size: 16px;
    color: #979FAA;
    margin-bottom: 15px;
    @media (max-width: 960px){
        text-align: center;
        margin: auto;  
    }
`;

const CompanyLogo = Styled.img`
    display: block;
    height: 150px;
    width: 150px;
    border-radius: 15px;
    object-fit: cover;

    @media (max-width: 960px){
        text-align: center;
        margin: auto;  
    border-radius: 15px;
    object-fit: cover;

    }
    
`;

const ShopBrandMobile = (props) => {
  const shopProfile = useSelector((state) => state.shopPreview.shopProfile);

  return (
    <Container>
      <CompanyLogo src={shopProfile && imageEndPoint + shopProfile.shop_logo} />
      <div style={{ margin: "25px 15px" }}>
        <BrandName>{shopProfile && shopProfile.shop_name}</BrandName>
        <BrandSlogan>{shopProfile && shopProfile.shop_bio}</BrandSlogan>
        <ShopId>Shop Id: {shopProfile && shopProfile.shop}</ShopId>

        <div>
          <ContactLabel>Social Media</ContactLabel>
          <div style={{ display: "flex" }}>
            <FlexContainer>
              {shopProfile && shopProfile.facebook_link ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    shopProfile &&
                    "https://www.facebook.com/" + shopProfile.facebook_link
                  }
                >
                  <Facebook style={{ color: "black" }} />
                </a>
              ) : null}
              {shopProfile && shopProfile.instagram_link ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    shopProfile &&
                    "https://www.instagram.com/" + shopProfile.instagram_link
                  }
                >
                  <Instagram style={{ color: "black" }} />
                </a>
              ) : null}
              {shopProfile && shopProfile.twitter_link ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    shopProfile &&
                    "https://twitter.com/" + shopProfile.twitter_link
                  }
                >
                  <Twitter style={{ color: "black" }} />
                </a>
              ) : null}
            </FlexContainer>
          </div>
        </div>
      </div>
    </Container>
  );
};
const ShopBrand = (props) => {
  const shopProfile = useSelector((state) => state.shopPreview.shopProfile);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <CompanyLogo
          src={shopProfile && imageEndPoint + shopProfile.shop_logo}
        />
        <div style={{ marginTop: "-10px", marginLeft: "25px" }}>
          <BrandName>{shopProfile && shopProfile.shop_name}</BrandName>
          <BrandSlogan>{shopProfile && shopProfile.shop_bio}</BrandSlogan>
          <ShopId>Shop Id: {shopProfile && shopProfile.shop}</ShopId>

          <div style={{ width: "100px" }}>
            {(shopProfile && shopProfile.facebook_link) ||
            shopProfile.instagram_link ||
            shopProfile.twitter_link ? (
              <ContactLabel>Social Media</ContactLabel>
            ) : null}
            <FlexContainer>
              {shopProfile && shopProfile.facebook_link ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    shopProfile &&
                    "https://www.facebook.com/" + shopProfile.facebook_link
                  }
                >
                  <Facebook style={{ color: "black" }} />
                </a>
              ) : null}
              {shopProfile && shopProfile.instagram_link ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    shopProfile &&
                    "https://www.instagram.com/" + shopProfile.instagram_link
                  }
                >
                  <Instagram style={{ color: "black" }} />
                </a>
              ) : null}
              {shopProfile && shopProfile.twitter_link ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    shopProfile &&
                    "https://twitter.com/" + shopProfile.twitter_link
                  }
                >
                  <Twitter style={{ color: "black" }} />
                </a>
              ) : null}

              {/* <WhatsApp /> */}
            </FlexContainer>
          </div>
        </div>
      </div>
    </Container>
  );
};
export { ShopBrandMobile, ShopBrand };
export default ShopBrand;
