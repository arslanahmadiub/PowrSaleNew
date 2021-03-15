import { Grid } from '@material-ui/core'
import { Facebook, Instagram, Twitter, WhatsApp } from '@material-ui/icons'
import React from 'react'
import Styled from "styled-components"


const FlexContainer = Styled.div`
display: flex;
width: 100%;
justify-content:${p => p.justify ? p.justify : "space-between"};
`
const Brand = Styled.div`
    padding: 15px 0;
`


const BrandName = Styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #010101;
`

const BrandSlogan = Styled.div`
    font-size: 18px; 
    color: #979FAA;
    
`

const ShopId = Styled.div`
    color: #31BDF4;
    font-size: 12px;
`

const BrandBrief = Styled.div`
    font-size: 16px;
    color: #010101;
    padding: 15px 0 30px 0;
`

const ContactLabel = Styled.div`
    font-size: 14px;
    color: #979FAA;
    padding: 15px 0 0 0;
`
const Contact = Styled.div`
    font-size: 16px;
    color: #010101;
    font-weight: 600;
    padding:  0 0 25px 0;
`

const CompanyLogo = Styled.img`
    display: block;
    height: 180px;
    width: 200px;
    margin: 0 15px 0 0;    
`

const TopRowDesktop = props => {

    const { logo, name, brief, social, contacts, description, shopId } = props.data;

    return <div style={{ marginBottom: "30px", borderBottom: "0.5px solid #979FAA" }}>

        <FlexContainer>
            <CompanyLogo src={logo && logo} />
            <div>
                <FlexContainer justify="space-between">
                    <Brand>
                        <BrandName>
                            {name && name}
                        </BrandName>
                        <BrandSlogan>
                            {description && description}
                        </BrandSlogan>
                    </Brand>

                    <ShopId>
                        shop ID: {shopId && shopId}
                    </ShopId>
                </FlexContainer>
                <BrandBrief>
                    {brief && brief}
                </BrandBrief>

                <Grid container direction="row" spacing={3}>
                    <Grid item xs={6} md={3}>
                        <ContactLabel>
                            Address
                </ContactLabel>

                        <Contact>
                            {contacts && contacts.address}
                        </Contact>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ContactLabel>
                            Phone
                </ContactLabel>

                        <Contact>
                            {contacts && contacts.phone}
                        </Contact>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ContactLabel>
                            Email
                </ContactLabel>

                        <Contact>
                            {contacts && contacts.phone}
                        </Contact>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ContactLabel>
                            Social
                </ContactLabel>

                        <Contact>
                            <FlexContainer style={{ width: "80px" }}>
                                <Facebook style={{ width: "20px" }} />
                                <Twitter style={{ width: "20px" }} />
                                <Instagram style={{ width: "20px" }} />
                                <WhatsApp style={{ width: "20px" }} />

                            </FlexContainer>
                        </Contact>
                    </Grid>

                </Grid>
            </div>
        </FlexContainer>

    </div>
}

export default TopRowDesktop;
