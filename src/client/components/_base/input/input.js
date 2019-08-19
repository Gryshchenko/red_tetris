
import React from 'react';
import './styles.css';

const Input = ({ onChange, title, value, id, type="text", text }) => {
    return (
        <div>
            <label htmlFor="lname" className='active'>{title}</label>
            <input id={id} value={value} onChange={onChange} type={type} className="cool" />
          {text && <div>{text}</div>}
        </div>
    );
}

export {
    Input,
};
