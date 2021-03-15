import React from 'react'
import Styled from "styled-components";
import ProductDetails from './ProductDetails';
import PaymentForm from '../../../Forms/PaymentForm';
import { Breadcrumbs, Link } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';


const BreadCrumbItem = Styled.a`
    font-size: 30px;
    font-weight: 700;
    color: ${p => p.active ? "#010101" : "#979FAA"};
    //display: ${p => p.step > p.index ? "none" : ''};
    text-decoration: none;
    &:hover{
        text-decoration: none;
    };
    @media (max-width: 960px){
        font-size: 12px;
    }
`


const BreadCrumbsRow = Styled(Breadcrumbs)`
    background: transparent;
    padding: 15px 0 30px 0;
`

const Container = Styled.div`
    padding: 0 50px 15px 50px;
    background: #F5F8FD;
    @media (max-width: 960px){
        padding: 0 10px 15px 10px;
    }
`

const BreadCrumbs = props => {
    const [step, setStep] = React.useState(2)
    const seleectedStep = index => {
        switch (index) {
            case 0:
                return <ProductDetails details={props.details} />
            case 1:
                return <p>
                    <h3>Shipping page</h3>

                    Amet qui id dolor aute commodo aliquip incididunt ea aliquip aute dolor dolore incididunt. Ea commodo culpa irure quis laborum ut cupidatat. Irure nostrud cupidatat voluptate nulla eiusmod incididunt ullamco incididunt deserunt excepteur laboris laborum quis. Adipisicing magna dolor dolore sit tempor consectetur esse incididunt amet quis sunt. Enim eu quis id reprehenderit. Amet do consequat occaecat anim ea irure incididunt. Ut pariatur laborum ipsum commodo enim in aliqua sint.

                    Mollit cillum fugiat non irure fugiat excepteur sint excepteur amet. Deserunt et ex ipsum enim adipisicing. Ad velit amet eiusmod aute ut nisi cupidatat ea amet qui magna cupidatat. Cillum Lorem esse eu in id aute sint ea. Nisi occaecat officia nostrud occaecat. Mollit occaecat duis mollit amet voluptate deserunt duis aliquip.

                    Minim culpa est consequat veniam laborum dolor aliqua minim tempor irure anim. Quis ex consectetur reprehenderit id nisi. Aute Lorem laboris ea ea voluptate labore fugiat commodo quis. Magna sunt esse qui ipsum anim irure ullamco ipsum nostrud commodo minim.</p>
            case 2:
                return <PaymentForm />
            default:
                return <ProductDetails details={props.details} />
        }
    }

    const changeFocus = index => event => {
        event.stopPropagation();
        setStep(index)
    }
    return <Container>
        <BreadCrumbsRow separator={<ArrowRight fontSize="large" />}>
            <BreadCrumbItem href="#" onClick={changeFocus(0)} active={step === 0} current={step} index={0}>Details</BreadCrumbItem>
            <BreadCrumbItem href="#" onClick={changeFocus(1)} active={step === 1} current={step} index={0}>Shipping</BreadCrumbItem>
            <BreadCrumbItem href="#" onClick={changeFocus(2)} active={step === 2} current={step} index={0}>Payment</BreadCrumbItem>
        </BreadCrumbsRow>
        {seleectedStep(step)}
    </Container>
}

export default BreadCrumbs;