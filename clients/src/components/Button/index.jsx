import React from "react";

const Button = ({ className, title, type = 'button', onClick, tooltip, icon = null, style }) => (
  <button type={type} className={`font-poppins btn ${className}`} onClick={onClick} title={tooltip} style={style}>
    {icon}{title}
  </button>
);

export default Button;
