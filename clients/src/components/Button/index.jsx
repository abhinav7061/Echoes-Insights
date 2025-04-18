import React from "react";

const Button = ({ className, title, type = 'button', tooltip, icon = null, ...rest }) => (
  <button type={type} className={`font-poppins btn ${className}`} title={tooltip} {...rest}>
    {icon}{title}
  </button>
);

export default Button;
