export const GET_IO_CHATS_PENDING = 'GET_IO_CHATS_PENDING'
export const GET_IO_CHATS_SUCCESS = 'GET_IO_CHATS_SUCCESS'
export const IO_CHATS_ADD_MESSAGE = 'IO_CHATS_ADD_MESSAGE'

export const SET_ACTIVE_USER = 'SET_ACTIVE_USER'
export const SET_MESSAGE_COUNT = 'SET_MESSAGE_COUNT'

export const getIOChats = (newUsers) => dispatch =>{
    return dispatch({
        type: GET_IO_CHATS_SUCCESS,
        newUsers
    })
}
export const getPIoMessage = ({ channel, message, status }) => dispatch => {
    return dispatch({
        type: IO_CHATS_ADD_MESSAGE,
        channel,
        message,
        status
    })
}

export const setActiveUser = (user) => dispatch => {
    return dispatch({
        type : SET_ACTIVE_USER,
        user
    })
}
export const setMessageCount = (count, channel) => dispatch => {
    return dispatch({
        type: SET_MESSAGE_COUNT,
        count,
        channel
    })
}