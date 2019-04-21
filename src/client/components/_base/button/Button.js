
import React from 'react';
import './styles.css';

const Button = ({ onClick, title, type }) => {
    return (
        <button onClick={onClick} type={type} className="button center">
            {title}
            <span className="pulse"></span>
        </button>
    );
}

export {
    Button,
};
