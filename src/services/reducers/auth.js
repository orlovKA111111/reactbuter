import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED
} from '../action/auth';

const initialState = {
  name:'',
  email:'',

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  forgotRequest: false,
  forgotFailed: false,

  resetRequest: false,
  resetFailed: false,

  authRequest: false,
  authFailed: false,

  tokenRequest: false,
  tokenFailed: false,
};


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return { ...state, forgotRequest:true };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return { ...state, forgotFailed:false, forgotRequest:false };
    }
    case FORGOT_PASSWORD_FAILED: {
      return { ...state, forgotFailed:true };
    }
    case RESET_PASSWORD_REQUEST: {
      return { ...state, resetRequest:true };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, resetFailed:false, resetRequest:false };
    }
    case RESET_PASSWORD_FAILED: {
      return { ...state, resetFailed:true };
    }
    case REGISTER_REQUEST: {
      return { ...state, registerRequest:true };
    }
    case REGISTER_SUCCESS: {
      return { ...state, registerFailed:false, registerRequest:false, name:action.user.name, email:action.user.email };
    }
    case REGISTER_FAILED: {
      return { ...state, registerFailed:true };
    }
    case LOGIN_REQUEST: {
      return { ...state, loginRequest:true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginFailed:false, loginRequest:false, name:action.user.name, email:action.user.email };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed:true };
    }
    case LOGOUT_REQUEST: {
      return { ...state, logoutRequest:true };
    }
    case LOGOUT_SUCCESS: {
      return { ...initialState, logoutFailed:false, logoutRequest:false };
    }
    case LOGOUT_FAILED: {
      return { ...state, logoutFailed:true };
    }
    case USER_REQUEST: {
      return { ...state, authRequest:true };
    }
    case USER_SUCCESS: {
      return { ...state, authFailed:false, authRequest:false, name:action.user.name, email:action.user.email };
    }
    case USER_FAILED: {
      return { ...state, authFailed:true };
    }
    case USER_UPDATE_REQUEST: {
      return { ...state, authRequest:true };
    }
    case USER_UPDATE_SUCCESS: {
      return { ...state, authFailed:false, authRequest:false, name:action.user.name, email:action.user.email };
    }
    case USER_UPDATE_FAILED: {
      return { ...state, authFailed:true };
    }
    case TOKEN_REQUEST: {
      return { ...state, tokenRequest:true };
    }
    case TOKEN_SUCCESS: {
      return { ...state, tokenFailed:false, tokenRequest:false };
    }
    case TOKEN_FAILED: {
      return { ...state, tokenFailed:true };
    }
    default: {
      return state;
    }
  }
};