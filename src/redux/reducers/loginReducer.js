import {USER_LOGIN, LOGIN_LOADING, CLOSE_SNACKBAR} from '../actions/loginAction';

const initialState ={
    loading: false,
    success: false,
    snackBarMessage: false,
    error: '',
}

export const loginReducer = (state = initialState, action) =>{
    // console.log(action)
    switch (action.type) {
        case USER_LOGIN:
            if(action.error){
                return {
                    ...state,
                    loading: false,
                    success: false,
                    snackBarMessage: true,
                    error: action.error
                }
            }
            return {
                ...state,
                loading: false,
                success: true
            }
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true,
                snackBarMessage: false
            }
        default:
            return state;
    }

}