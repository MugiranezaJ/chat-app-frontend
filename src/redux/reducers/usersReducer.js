import {GET_USERS_PENDING, GET_USERS_SUCCESS, GET_USERS_ERROR} from '../actions/usersAction'

const initialState = {
  // pending: false,
  // users: [],
  // total: 0,
  error: null
}

export function getUsersReducer(state = initialState, action){
  switch(action.type){
    case GET_USERS_PENDING:
      return {
        ...state,
        pending: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case GET_USERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  } 
 

}