
import React, { useEffect, useState } from 'react';
import './styles.css';
import { withRouter } from 'react-router';

const Logo = (props) => {
    const [logoText, setLogoText] = useState('');

    useEffect(() => {
        setLogoTextAnimation(setLogoText);
    }, []);
    return (
        <React.Fragment>
            <div>
                <span onClick={() => props.history.push(`/`)} className={'logo'}>{logoText}</span>
            </div>
        </React.Fragment>
    );
}

const setLogoTextAnimation = (setLogoText) => {
    const newLogoText = 'RED TETRIS';
    let tmp = '';
    let i = 0;

    let interval = setInterval(() => {
        if (i < newLogoText.length) {
            tmp += newLogoText[i];
            setLogoText(tmp);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

export default withRouter(Logo);
