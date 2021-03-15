import { Facebook, Instagram, Twitter, WhatsApp } from '@material-ui/icons'
import React from 'react'
import Styled from "styled-components"


const Container = Styled.div`
padding: 50px 30px;
border-radius: 0;
`
const FlexContainer = Styled.div`
display: flex;
justify-content: space-between;
@media (max-width: 960px){
        text-align: center;
        margin: auto;  
    }
`


const BrandName = Styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #010101;
    @media (max-width: 960px){
        text-align: center;
        margin: auto;
        padding: 15px;  
    }
    
`

const BrandSlogan = Styled.div`
    font-size: 18px; 
    color: #979FAA;
    @media (max-width: 960px){
        text-align: center;
        margin: auto; 
        padding: 15px; 
    }
    
`

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

`

const ContactLabel = Styled.div`
    font-size: 16px;
    color: #979FAA;
    margin-bottom: 15px;
    @media (max-width: 960px){
        text-align: center;
        margin: auto;  
    }
`

const CompanyLogo = Styled.img`
    display: block;
    height: 150px;
    width: 150px;
    @media (max-width: 960px){
        text-align: center;
        margin: auto;  
    }
    
`

const ShopBrandMobile = props => {
    const { logo, name, slogan, shopid } = props;

    return <Container>

        <CompanyLogo src={logo && logo} />
        <div style={{ margin: "25px 15px" }}>
            <BrandName>
                {name && name}
            </BrandName>
            <BrandSlogan>
                {slogan && slogan}
            </BrandSlogan>
            <ShopId>
                shop Id: {shopid}
            </ShopId>


            <div style={{ width: "100px", marginTop: "50px" }}>
                <ContactLabel>
                    Social Media
                    </ContactLabel>
                <FlexContainer>
                    <Facebook />
                    <Instagram />
                    <Twitter />
                    <WhatsApp />
                </FlexContainer>
            </div>
        </div>


    </Container >
}
const ShopBrand = props => {

    const { logo, name, slogan, shopid } = props;
    return <Container>
        <div style={{ display: "flex" }}>
            <CompanyLogo src={logo && logo} />
            <div style={{ margin: "25px 15px" }}>
                <BrandName>
                    {name && name}
                </BrandName>
                <BrandSlogan>
                    {slogan && slogan}
                </BrandSlogan>
                <ShopId>
                    shop Id: {shopid}
                </ShopId>


                <div style={{ width: "100px", marginTop: "50px" }}>
                    <ContactLabel>
                        Social Media
                    </ContactLabel>
                    <FlexContainer>
                        <Facebook />
                        <Instagram />
                        <Twitter />
                        <WhatsApp />
                    </FlexContainer>
                </div>
            </div>
        </div>


    </Container>
}
export { ShopBrandMobile, ShopBrand }
export default ShopBrand;