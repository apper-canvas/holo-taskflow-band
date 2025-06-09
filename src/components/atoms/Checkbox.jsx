import React from 'react';

const Checkbox = ({ id, checked, onChange, className, ...props }) => {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer ${className || ''}`}
      {...props}
    />
  );
};

export default Checkbox;