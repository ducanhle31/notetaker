import React , { useState }  from 'react'
import Todo from './Todo';

export default function Commet() {

    const [clickPosition, setClickPosition] = useState({ x: null, y: null });
  const [displayText, setDisplayText] = useState('');

  const handleClick = (event) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
   setDisplayText(<Todo  clickPosition={clickPosition}/>); 
  };

  const textStyles = {
  position: 'absolute',
    top: clickPosition.y,
    left: clickPosition.x,

  };
   
  console.log(textStyles)
  return (
    
      <div onClick={handleClick}   style={{ height: '600px', width:'1440px'}}>
    
      {displayText   && <p  style={textStyles} >{displayText}</p>}


    </div>
  )
}
