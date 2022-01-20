import Axios from './axiosConfig'
export const USER_REGISTER = 'REGISTER';
export const REGISTER_LOADING = 'LOADING';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const registerAction = (userCredentials) => dispatch => {
    dispatch({ type: REGISTER_LOADING });
    return Axios.post(`/register`, userCredentials)
    .then((res) => {
        localStorage.setItem('mechat_access_token',res.data.token);
        dispatch({
            type: USER_REGISTER
        })
    })
    .catch(err=>{
        if(err.message === 'Network Error'){
            dispatch({
                type: USER_REGISTER,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: USER_REGISTER,
                error: err.response.data.error
            })
        }
    });
}