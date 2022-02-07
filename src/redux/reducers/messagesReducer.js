import {
    FETCH_MESSAGES_PENDING, 
    FETCH_MESSAGES_SUCCESS, 
    FETCH_MESSAGES_ERROR
} from '../actions/messagesAction'

const initialState = {
    pending: false,
    messages: [],
    total_amount: 0,
    error: null
}

export function getMessagesReducer(state = initialState, action){
    switch(action.type){
        case FETCH_MESSAGES_PENDING:
            return {
            ...state,
            pending: true
            }
        case FETCH_MESSAGES_SUCCESS:
            return {
            ...state,
            pending: false,
            total_amount: action.total,
            messages: action.payload,
            error: null
            }
        case FETCH_MESSAGES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                messages: []
            }
        default:
            return state
    } 
}
