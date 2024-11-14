import React from "react";

const Button = ({ className, title, type, onclicks, tooltip, icon = null }) => (
  <button type={type} className={`font-poppins font-bold text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${className}`} onClick={onclicks} title={tooltip}>
    {icon}{title}
  </button>
);

export default Button;
