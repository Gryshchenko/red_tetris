
import React from 'react';
import './styles.css';

const Input = ({ onChange, title, value, id, type="text", text, wrapperStyle, textStyle }) => {
    return (
        <div style={wrapperStyle}>
            <label htmlFor="lname" className='active'>{title}</label>
            <input id={id} value={value} onChange={onChange} type={type} className="cool" />
          {text && <div style={textStyle}>{text}</div>}
        </div>
    );
}

export {
    Input,
};
