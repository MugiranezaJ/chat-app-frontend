import { 
    IO_CHATS_ADD_MESSAGE, 
    GET_IO_CHATS_PENDING, 
    GET_IO_CHATS_SUCCESS, 
    SET_ACTIVE_USER, 
    SET_MESSAGE_COUNT 
} from "../actions/chatsAction"

const initialState = {
    pending: false,
    chats: [],
    active_user: null
}

export const getIOChatsReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_IO_CHATS_PENDING:
            return{
                ...state,
                pending: true
            }
        case GET_IO_CHATS_SUCCESS:
            let currentChats = [ ...state.chats]
            let previousChats = state.chats.map( chat => chat.name )
            Object.keys( action.newUsers ).map( async (newUser) => {
                if(!previousChats.includes( newUser )){
                currentChats.push({
                    name: newUser,
                    role: action.newUsers[newUser].role,
                    messages: [],
                    msgCount: 0,
                })
                }
                return null
            })
            return{
                ...state,
                chats: currentChats
            }
        case IO_CHATS_ADD_MESSAGE:
            state.chats.map( chat => {
                if( chat.name === action.channel ) {
                    chat.messages.push(action.message)
                    if( state.active_user !== action.channel ) {
                        chat.msgCount ++
                    }
                }
                return null
            })
            return{
                ...state,
                status: action.status
            }
        case SET_ACTIVE_USER:
            return {
                ...state,
                active_user: action.user
            }
        case SET_MESSAGE_COUNT:
            state.chats.map( chat => {
                if( state.active_user === action.channel ) {
                    chat.msgCount = 0
                }
            return null
            })
            return{
                ...state
            }
        default:
            return state
    }
}