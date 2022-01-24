import Axios from './axiosConfig'

export const GET_USERS_PENDING = 'GET_USERS_PENDING'
export const  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_ERROR = 'GET_USERS_ERROR'

const token = localStorage.getItem('mechat_access_token');

export const getAllUsers = () => dispatch => {
  dispatch({
    type: GET_USERS_PENDING
  })
  
  return Axios.post('/verify_token', {token})
    .then(res => {
      console.log("Inside verify")
      console.log(res.data)
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: res.data.user,
      })
      }
    )
    .catch(err => {
      dispatch({
        type: GET_USERS_ERROR,
        error: err
      })
    })
}