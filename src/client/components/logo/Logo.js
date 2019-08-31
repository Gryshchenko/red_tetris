
import React, { useEffect } from 'react';
import './styles.css';
import { withRouter } from 'react-router';

const Logo = (props) => {
    useEffect(() => {
        setLogoTextAnimation();
    });
    return (
        <React.Fragment>
            <div>
                <span onClick={() => props.history.push(`/`)} className={'logo'} id={'logo'}/>
            </div>
        </React.Fragment>
    );
}

const setLogoTextAnimation = () => {
    const logo = document.getElementById('logo');
    const newLogo = 'RED TETRIS';
    let i = 0;
    if (logo.innerHTML.length > 0) return ;
    const interval = setInterval(() => {
        if (i < newLogo.length) {
            logo.innerHTML = logo.innerHTML + newLogo[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

export default withRouter(Logo);
