import Axios from './axiosConfig'
export const FETCH_MESSAGES_PENDING = 'FETCH_MESSAGES_PENDING'
export const  FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS'
export const FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR'

export const GET_IO_MESSAGES_PENDING = 'GET_IO_MESSAGES_PENDING'
export const GET_IO_MESSAGE_SUCCESS = 'GET_IO_MESSAGE_SUCCESS'
export const GET_IO_MESSAGES_ERROR = 'GET_IO_MESSAGES_ERROR'

export const getMessages = (sender, reciver) => dispatch => {
    dispatch({
      type: FETCH_MESSAGES_PENDING
    })
    return Axios.get(`/messages/`, {params:{sender, reciver}})
      .then(res => {
          console.log(res)
        dispatch({
          type: FETCH_MESSAGES_SUCCESS,
          payload: res.data.messages.rows,
          total: res.data.messages.count,
          error: null
        })
        }
      )
      .catch(err => {
        dispatch({
          type: FETCH_MESSAGES_ERROR,
          error: err
        })
      })
  }
