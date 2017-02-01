import React from 'react';

const containerStyle = {
  position: 'relative',
  left: '-25px',
  top: '-25px',
  height: '50px',
  width: '50px',
  overflow: 'visible'
}
const svgStyle = {
  position: 'relative',
  height: '50px',
  width: '50px',
  fill: '#373737'
}

const nameStyles = {
  position: 'absolute',
  top: '-26px',
  left: '-50px',
  width: '150px',
  fontFamily: `'Helvetica', 'Tahoma', sans-serif`,
  fontSize: '1.5rem',
  color: '#373737',
  backgroundColor: 'transparent',
  textAlign: 'center'
}

export default function Marker(props) {
  return (
    <div style={containerStyle}>
      <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.213 485.212">
        <path width="100%" height="100%" d="M242.606 0C142.124 0 60.65 81.473 60.65 181.955s151.632 303.257 181.957 303.257c30.326 0 181.955-202.775 181.955-303.257S343.09 0 242.606 0zm0 303.257c-66.9 0-121.302-54.433-121.302-121.302S175.706 60.65 242.606 60.65c66.902 0 121.302 54.436 121.302 121.305s-54.4 121.302-121.302 121.302z"/>
      </svg>
      <span style={nameStyles}>{props.name}</span>
    </div>


  )
}
