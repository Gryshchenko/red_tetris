
import React from 'react';
import './styles.css';

const Input = ({ onChange, title, value, id }) => {
    return (
        <div>
            <label htmlFor="lname" className='active'>{title}</label>
            <input id={id} value={value} onChange={onChange} type="text" className="cool" />
        </div>
    );
}

export {
    Input,
};
