import React from 'react';

const InmobidataLogo = ({ width = '100', height = '60' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 100 60"
      fill="none"
    >
      {/* House icon */}
      <path
        d="M30 40L20 30L10 40V50H30V40Z"
        fill="#108BDE"
        stroke="#108BDE"
        strokeWidth="1"
      />
      {/* Roof */}
      <path
        d="M20 20L5 35H35L20 20Z"
        fill="#108BDE"
        stroke="#108BDE"
        strokeWidth="1"
      />
      {/* Window */}
      <rect x="15" y="42" width="5" height="5" fill="white" />
      
      {/* Chart line */}
      <path
        d="M40 45L45 38L50 42L55 30L60 25"
        stroke="#108BDE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chart endpoint */}
      <circle cx="60" cy="25" r="3" fill="#108BDE" />
    </svg>
  );
};

export default InmobidataLogo; 