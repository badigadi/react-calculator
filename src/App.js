import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './index.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPER: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currOper: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currOper === "0") { return state }
      if (payload.digit === "." && state.currOper == null) { return state }
      if (payload.digit === "." && state.currOper.includes(".")) { return state }
      return {
        ...state,
        currOper: `${state.currOper || ""}${payload.digit}`,
      }
      case ACTIONS.CHOOSE_OPER:
        if (state.currOper == null && state.prevOper == null) { return state }

        if(state.currOper == null) {
          return {
            ...state, 
            oper: payload.oper,
          }
        }

        if (state.prevOper == null) {
          return {
            ...state,
            oper: payload.oper,
            prevOper: state.currOper,
            currOper: null,
          }
        }
          return {
            ...state,
            prevOper: evaluate(state),
            currOper: null
          }
      case ACTIONS.CLEAR:
        return {}
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currOper: null
          }
        }
        if (state.currOper == null) return state
        if (state.currOper.length === 1) {
          return { ...state, currOper: null }
        }

        return {
          ...state,
          currOper: state.currOper.slice(0, -1)
        }
      case ACTIONS.EVALUATE:
        if (state.oper == null || state.currOper == null || state.prevOper == null) {
          return state
        }

        return {
          ...state,
          prevOper: null,
          overwrite: true,
          oper: null,
          currOper: evaluate(state)
        }
  }
}

function evaluate({ currOper, prevOper, oper }) {
  const prev = parseFloat(prevOper);
  const current = parseFloat(currOper);
  if (isNaN(prev) || isNaN(current)) return ""
  let compilation = ""
  switch (oper) {
    case "+":
      compilation = prev + current
      break
    case "-":
      compilation = prev - current
      break
    case "÷":
      compilation = prev / current
      break
    case "%":
      compilation = prev % current;
      break
    case "*":
      compilation = prev * current;
      break
  }
  return compilation.toString()
}

const integer_formatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOper(oper) {
  if (oper == null) return
  const [integer, decimal] = oper.split('.')
  if (decimal == null) return integer_formatter.format(integer)
  return `${integer_formatter.format(integer)}.${decimal}`
}

function App() {

  const [{ currOper, prevOper, oper }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calc">
      <div className="output">
        <div className="prev-oper">{formatOper(prevOper)} {oper}</div>
        <div className="curr-oper">{formatOper(currOper)}</div>
      </div>
      <button className='light-gray' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button className='light-gray' onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton oper='%' className='light-gray procent' dispatch={dispatch} />
      <OperationButton oper='÷' className='orange' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton oper='*' className='orange cross' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton oper='-' className='orange minus' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton oper='+' className='orange' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} className="span-two" />
      <DigitButton digit='.' dispatch={dispatch} />
      <button className='orange' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
