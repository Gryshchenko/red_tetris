
import React from 'react';
import './styles.css';

const ErrorMsg = ({ children, id }) => {
    return (
        <div>
            <div>
                {children}
            </div>
            <span className='valid' id={id} />
        </div>
    );
}

export {
    ErrorMsg,
};
