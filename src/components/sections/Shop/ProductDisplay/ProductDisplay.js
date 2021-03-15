import React from "react";
import Styled from "styled-components";
import RenderProducts from "./RenderProducts";
import { brandDetails, products } from "../../../../DummyData/DummyData";
import { Hidden } from "@material-ui/core";
import TopRowMobile from "./TopRowMobile";
import TopRowDesktop from "./TopRowDesktop";
import { useSelector } from "react-redux";

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
// const Brand = Styled.div``

const BrandName = Styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #010101;
`;

const BrandSlogan = Styled.div`
    font-size: 18px; 
    color: #979FAA;
    
`;

// const ShopId = Styled.div`
//     color: #31BDF4;
//     font-size: 16px;
// `

// const BrandBrief = Styled.div`
//     font-size: 16px;
//     color: #010101;
//     margin: 15px 0;
// `

// const ContactLabel = Styled.div`
//     font-size: 14px;
//     color: #979FAA;
// `
// const Contact = Styled.div`
//     font-size: 16px;
//     color: #010101;
//     font-weight: 600;
// `

// const CompanyLogo = Styled.img`
//     display: block;
//     height: 150px;
//     width: 150px;
// `

let ProductDisplay = (props) => {
  const shopData = useSelector((state) => state.shopPreview);

  return (
    <Container>
      <Hidden smDown>
        <TopRowDesktop data={props.shopData} />
      </Hidden>

      <Hidden mdUp>
        <TopRowMobile data={props.shopData} />
      </Hidden>
    </Container>
  );
};

export default ProductDisplay;
