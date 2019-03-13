import React from 'react'
import './styles.css';

const setCols = (x) => {
  const result = [];
  for (let i = 0; i <= x; i++) {
    result.push(<X/>)
  } 
  return result;
}

const setRows = (y) => {
  const result = [];
  for (let i = 0; i <= y; i++) {
    result.push(
      <Y>
        {setCols(9)}
      </Y>
    )
  } 
  return result;
}

const Map = () => {
  return (
   <Wrapper>
     {setRows(19)}
   </Wrapper> 
  )
};

const X = () => {
  return (
    <div className='block blockBorder' />
  );
}

const Y = ({children}) => {
  return (
    <div className='rows'>{children}</div>
  );
}

const Wrapper = ({children}) => {
  return (
    <div className='wrapper'>
      {children}
    </div>
  );
}

export {
    Map,
};
