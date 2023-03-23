import React from 'react'
import { ACTIONS } from './App'

const DigitButton = ({digit, dispatch}) => {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})} className={digit == "0" ? "span-two" : ""}>{digit}</button> 
  )
}

export default DigitButton