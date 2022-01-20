import {USER_REGISTER, REGISTER_LOADING, } from '../actions/registerAction';

const initialState ={
    loading: false,
    success: false,
    snackBarMessage: false,
    error: '',
}

export const registerReducer = (state = initialState, action) =>{
    // console.log(action)
    switch (action.type) {
        case USER_REGISTER:
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
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true,
                snackBarMessage: false
            }
        default:
            return state;
    }

}