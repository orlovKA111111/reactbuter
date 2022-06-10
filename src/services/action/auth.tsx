import { useHistory } from 'react-router-dom';
import {
    forgotPasswordRequest,
    resetPasswordRequest,
    authRequest,
    logoutRequest,
    getAuthRequest,
    updateAuthRequest,
    getAccessTokenRequest
} from '../../utlls/api';
import { deleteCookie, setCookie } from '../../utlls/cookie';
import { AppThunk, AppDispatch } from '../types';

export const FORGOT_PASSWORD_REQUEST : 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS : 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED : 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST : 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS : 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED : 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const REGISTER_REQUEST : 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS : 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED : 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const LOGIN_REQUEST : 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS : 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED : 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST : 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS : 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED  : 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const USER_REQUEST : 'USER_REQUEST' = 'USER_REQUEST';
export const USER_SUCCESS : 'USER_SUCCESS' = 'USER_SUCCESS';
export const USER_FAILED : 'USER_FAILED' = 'USER_FAILED';

export const TOKEN_REQUEST : 'TOKEN_REQUEST' = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS : 'TOKEN_SUCCESS' = 'TOKEN_SUCCESS';
export const TOKEN_FAILED : 'TOKEN_FAILED' = 'TOKEN_FAILED';

export const USER_UPDATE_REQUEST : 'USER_UPDATE_REQUEST' = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS : 'USER_UPDATE_SUCCESS' = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED : 'USER_UPDATE_FAILED' = 'USER_UPDATE_FAILED';


export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST
}
export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
}
export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED
}
export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST
}
export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}
export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED
}
export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST
}
export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS,
    user : {
        name:string,
        email:string
    }
}
export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED
}

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST
}
export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS,
    user : {
        name:string,
        email:string
    }
}
export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED
}
export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST
}
export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS
}
export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED
}
export interface IUserRequest {
    readonly type: typeof USER_REQUEST
}
export interface IUserSuccess {
    readonly type: typeof USER_SUCCESS
    user : {
        name:string,
        email:string
    }
}
export interface IUserFailed {
    readonly type: typeof USER_FAILED
}
export interface IUserUpdateRequest {
    readonly type: typeof USER_UPDATE_REQUEST
}
export interface IUserUpdateSuccess {
    readonly type: typeof USER_UPDATE_SUCCESS
    user : {
        name:string,
        email:string
    }
}
export interface IUserUpdateFailed {
    readonly type: typeof USER_UPDATE_FAILED
}
export interface ITokenRequest {
    readonly type: typeof TOKEN_REQUEST
}
export interface ITokenSuccess {
    readonly type: typeof TOKEN_SUCCESS
}
export interface ITokenFailed {
    readonly type: typeof TOKEN_FAILED
}
export type TAuthActions =
    | IForgotPasswordRequest
    | IForgotPasswordSuccess
    | IForgotPasswordFailed
    | IResetPasswordRequest
    | IResetPasswordSuccess
    | IResetPasswordFailed
    | ILoginRequest
    | ILoginSuccess
    | ILoginFailed
    | IRegisterRequest
    | IRegisterSuccess
    | IRegisterFailed
    | ILogoutRequest
    | ILogoutSuccess
    | ILogoutFailed
    | IUserRequest
    | IUserSuccess
    | IUserFailed
    | IUserUpdateRequest
    | IUserUpdateSuccess
    | IUserUpdateFailed
    | ITokenRequest
    | ITokenSuccess
    | ITokenFailed;

export const forgotPassword: AppThunk = (form : {email:string}, redirect : () => void) => {
    return function(dispatch : AppDispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPasswordRequest(form)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    });
                    redirect();
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            );
    };
}

export const resetPassword : AppThunk = (form : {token:string, password:string}, redirect : () => void) => {
    return function(dispatch : AppDispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        resetPasswordRequest(form)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    });
                    redirect();
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            );
    };
}

export const register : AppThunk = (form : {name:string, email:string, password:string}, redirect : () => void) => {
    return function(dispatch : AppDispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });
        authRequest(form, 'auth/register')
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken, { maxAge: 30000, secure: false, sameSite: "Lax" });
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user:res.user
                    });
                    redirect();
                } else {
                    dispatch({
                        type: REGISTER_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: REGISTER_FAILED
                })
            );
    };
};

export const login : AppThunk = (form : {email:string, password:string}) => {
    return function(dispatch : AppDispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        authRequest(form, 'auth/login')
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken, { maxAge: 30000, secure: false, sameSite: "Lax" });
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user:res.user
                    });
                } else {
                    dispatch({
                        type: LOGIN_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: LOGIN_FAILED
                })
            );
    };
};

export const logout : AppThunk = (redirect : () => void) => {
    return function(dispatch : AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        logoutRequest()
            .then((res) => {
                localStorage.removeItem('refreshToken');
                deleteCookie('token');
                if (res && res.success) {
                    dispatch({
                        type: LOGOUT_SUCCESS,
                    });
                    redirect();
                } else {
                    dispatch({
                        type: LOGOUT_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: LOGOUT_FAILED
                })
            );
    };
};

export const updateAuth : AppThunk = (form : {name:string, email:string, password:string}) => {
    return function(dispatch) {
        dispatch({
            type: USER_UPDATE_REQUEST
        });
        updateAuthRequest(form)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: USER_SUCCESS,
                        user: res.user
                    });
                } else {
                    dispatch({
                        type: USER_FAILED
                    });
                }
            })
            .catch((e) => {
                if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                    dispatch(getAccessToken());
                    dispatch(updateAuth(form));
                } else dispatch({
                    type: USER_FAILED,
                })
            });
    };
};

export const getAuth : AppThunk = () => {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        getAuthRequest()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: USER_SUCCESS,
                        user: res.user
                    });
                    return res;
                } else {
                    dispatch({
                        type: USER_FAILED,
                    });
                }
            })
            .catch((e) => {
                dispatch(logout(() => useHistory().push('/login')));
                dispatch({
                    type: USER_FAILED,
                })
            });
    };
};

export const getAccessToken : AppThunk = () => {
    return function (dispatch) {
        dispatch({ type: TOKEN_REQUEST });
        getAccessTokenRequest()
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken, { maxAge: 30000, secure: false, sameSite: "Lax" });
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch({
                        type: TOKEN_SUCCESS
                    });
                } else {
                    dispatch(logout(() => useHistory().push('/login')));
                    dispatch({
                        type: TOKEN_FAILED
                    });
                }
            })
            .catch((e) => {
                if (e.message === 'Token is invalid') {
                    getAccessToken();
                } else dispatch({
                    type: TOKEN_FAILED
                })
            });
    };
};