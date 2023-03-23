import { ACTIONS } from './App'

const OperationButton = ({ oper, dispatch }) => {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPER, payload: {oper}})} className={oper !== "%" ? "orange" : "light-gray"}>{oper}</button> 
  )
}

export default OperationButton