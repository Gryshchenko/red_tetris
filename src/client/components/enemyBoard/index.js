import React from 'react'
import './styles.css';

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const setRows = (map) => {
  const result = map.map((rows, idx)=> {
    return (
      <Y idx={idx}>
        {
          rows.map((cols, idx) => {
            return (
             <X idx={idx} color={cols} />
            );
          })
        }
      </Y>
    );
  })
  return result;
}

const EnemyBoard = () => {
  return (
   <Wrapper>
     {setRows(map)}
   </Wrapper> 
  )
};

const X = ({color, idx}) => {
  return (
    <div key={idx} className={`block enemyBoardBlock ${color === 1 ? 'white' : ''}`} />
  );
}

const Y = ({children, idx}) => {
  return (
    <div key={idx} className='rows'>{children}</div>
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
    EnemyBoard,
};
