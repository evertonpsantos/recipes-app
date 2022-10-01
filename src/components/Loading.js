import React from 'react';
import foodCoverLogo from '../images/foodCoverLogo.svg';
import '../style/Loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-image">
        <img src={ foodCoverLogo } alt="cloche cover" />
      </div>
      <h1>Loading</h1>
    </div>
  );
}
