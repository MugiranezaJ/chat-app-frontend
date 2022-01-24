import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import { loginReducer } from './loginReducer'
import { registerReducer } from './registerReducer';
import { getUsersReducer } from './usersReducer';

const reducers = combineReducers({
    form: formReducer,
    login: loginReducer,
    register: registerReducer,
    userinfo: getUsersReducer
})

export default reducers