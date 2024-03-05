const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}


// The reducer function is responsible for changing the state of the application
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const incrementGood = {
        ...state,
        good: state.good + 1
      }
      return incrementGood
    case 'OK':
      const incrementOk = {
        ...state,
        ok: state.ok + 1
      }
      return incrementOk
    case 'BAD':
      const incrementBad = {
        ...state,
        bad: state.bad + 1
      }
      return incrementBad
    case 'ZERO':
      return action.payload
    default: return state
  }
}

export default counterReducer
