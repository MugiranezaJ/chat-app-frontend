import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import { getIOChatsReducer } from './chatsReducer';
import { loginReducer } from './loginReducer'
import { getMessagesReducer } from './messagesReducer';
import { registerReducer } from './registerReducer';
import { getUsersReducer } from './usersReducer';

const reducers = combineReducers({
    form: formReducer,
    login: loginReducer,
    register: registerReducer,
    userinfo: getUsersReducer,
    messages: getMessagesReducer,
    io_chats: getIOChatsReducer,
})

export default reducers