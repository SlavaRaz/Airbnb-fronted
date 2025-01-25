import React from 'react';
import { BeatLoader } from 'react-spinners'; 

export const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader className="custom-beat-loader" size={15} />
    </div>
  )
}