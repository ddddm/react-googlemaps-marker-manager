import React from 'react';

const style = {
  position: 'relative',
  left: '-10px',
  top: '-10px',
  height: '20px',
  width: '20px',
  borderRadius: '50px',
  background: '#0f0f0f',
  border: '2px solid #848388'
}

export default function Marker(props) {
  return (
    <div style={style}></div>
  )
}
