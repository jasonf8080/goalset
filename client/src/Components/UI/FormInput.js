import React from 'react'
import { useDispatch } from 'react-redux'
import { clearMessage } from '../../Features/userSlice';

const FormInput = ({id, type, name, value, onChange}) => {
  const dispatch = useDispatch();

  return (
    <input 
     id={id}
     className={name}
     type={type}
     value={value}
     onChange={(e) => onChange(e.target.value)}
     placeholder={name}
     onClick={() => dispatch(clearMessage())}></input>
  )
}

export default FormInput