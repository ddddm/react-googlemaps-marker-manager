import React from 'react';

const style = {
  position: 'relative',
  left: '-10px',
  top: '-10px',
  height: '20px',
  width: '20px',
  borderRadius: '50px',
  background: '#000000',
  border: '3px solid #575757'
}

export default function Marker(props) {
  return (
    <div style={style}></div>
  )
}
