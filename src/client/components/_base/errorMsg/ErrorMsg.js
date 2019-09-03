import React from 'react';
import './styles.css';

const ErrorMsg = ({ children, errorMessage }) => {
    return (
        <div>
            <div>
                {children}
            </div>
            <span className='valid'>{errorMessage}</span>
        </div>
    );
}

export {
    ErrorMsg,
};
