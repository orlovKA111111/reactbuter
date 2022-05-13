import {
    forgotPasswordRequest,
    resetPasswordRequest,
    authRequest,
    logoutRequest,
    getAuthRequest,
    updateAuthRequest,
    getAccessTokenRequest
} from '../../utlls/api';
import {
    deleteCookie,
    setCookie
} from '../../utlls/cookie';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

export function forgotPassword(form, redirect) {
  return function(dispatch) {
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

export function resetPassword(form, redirect) {
  return function(dispatch) {
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

export const register = (form, redirect) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    authRequest(form, 'auth/register')
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
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

export const login = (form) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    authRequest(form, 'auth/login')
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
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

export const logout = (redirect) => {
  return function(dispatch) {
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

export const updateAuth = (form) => {
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

export const getAuth = () => {
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
        if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
          dispatch(getAccessToken());
          dispatch(getAuth());
        } else dispatch({
          type: USER_FAILED,
        })
      });
  };
};

export const getAccessToken = () => {
  return function (dispatch) {
    dispatch({ type: TOKEN_REQUEST });
    getAccessTokenRequest()
      .then((res) => {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        if (res && res.success) {
          dispatch({ 
            type: TOKEN_SUCCESS 
          });
        } else {
          logout();
          dispatch({ 
            type: TOKEN_FAILED 
          });
        }
      })
      .catch((e) => {
        if (e.message === 'Token is invalid') {
          dispatch(getAccessToken());
        } else dispatch({
          type: TOKEN_FAILED
        })
      });
  };
};