import React from 'react'
import { useHistory } from 'react-router-dom';
import notFound from '../assets/images/404.svg'
import logo from '../assets/images/logo.png'
import { ThemeContext } from '../contexts/ThemeContext';


export default function PageNotFound(props) {

    const theme = React.useContext(ThemeContext)
    const history = useHistory();


    return <div
        style={{
            position: 'relative', background: `url(${notFound})`,
            backgroundSize: '50vw 50vh', width: "100vw", height: '100vh',
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
        }}>
        <img
            onClick={() => history.push('/')}
            src={`${logo}`}
            alt={'Powrsale Logo'}

            style={{
                position: 'absolute',
                top: '30px',
                left: '30px',
                cursor: 'pointer',
            }}
        />
        <h4
            style={{
                position: 'absolute',
                display: 'inline-block',
                top: '50px',
                color: `${theme.primaryBlue}`,
                fontSize: '20px',
                transform: 'translateX(35vw)',
            }}
        >Sorry the page you requested does not exist</h4>
        <p
            style={{
                position: 'absolute',
                display: 'inline-block',
                bottom: '5px',
                color: `${theme.ligghGrey}`,
                fontSize: '20px',
                transform: 'translateX(35vw)',

            }}
        >
            To go to our homepage, click on the logo!
        </p>


    </div>

}