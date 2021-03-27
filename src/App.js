import { useReducer } from 'react'
import reducer from './reducer'
const defaultState = {}
function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <div>
      <h1>hello world!</h1>
    </div>
  )
}

export default App
