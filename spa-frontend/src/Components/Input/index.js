import React from 'react';
import { InputCustomizado } from './styles'

const Input = ({
  name,
  placeholder,
  onChange,
  type,
  value
}) => {
  return ( 
    <InputCustomizado
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      value={value}
    />
   );
}

export default Input;