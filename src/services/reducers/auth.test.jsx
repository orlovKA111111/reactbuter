import { authReducer } from './auth'
import * as types from '../action/auth';

const initialState = {
    name:'',
    email:'',
    registerRequest: false,
    registerFailed: false,
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

describe('authReducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.FORGOT_PASSWORD_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                forgotRequest:true
            }
        )
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.FORGOT_PASSWORD_SUCCESS
            })
        ).toEqual(
            {
                ...initialState,
                forgotFailed:false,
                forgotRequest:false
            }
        )
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.FORGOT_PASSWORD_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                forgotFailed:true
            }
        )
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.RESET_PASSWORD_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                resetRequest:true
            }
        )
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.RESET_PASSWORD_SUCCESS
            })
        ).toEqual(
            {
                ...initialState,
                resetFailed:false,
                resetRequest:false
            }
        )
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.RESET_PASSWORD_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                resetFailed:true
            }
        )
    })

    it('should handle REGISTER_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.REGISTER_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                registerRequest:true
            }
        )
    })

    it('should handle REGISTER_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.REGISTER_SUCCESS,
                user: {name:'', email:''}
            })
        ).toEqual(
            {
                ...initialState,
                registerFailed:false,
                registerRequest:false,
                name:'',
                email:''
            }
        )
    })

    it('should handle REGISTER_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.REGISTER_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                registerFailed:true
            }
        )
    })

    it('should handle LOGIN_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGIN_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                loginRequest:true
            }
        )
    })

    it('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGIN_SUCCESS,
                user: {name:'', email:''}
            })
        ).toEqual(
            {
                ...initialState,
                loginFailed:false,
                loginRequest:false,
                name:'',
                email:''
            }
        )
    })

    it('should handle LOGIN_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGIN_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                loginFailed:true
            }
        )
    })

    it('should handle LOGOUT_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGOUT_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                logoutRequest:true
            }
        )
    })

    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGOUT_SUCCESS
            })
        ).toEqual(
            {
                ...initialState,
                logoutFailed:false,
                logoutRequest:false
            }
        )
    })

    it('should handle LOGOUT_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGOUT_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                logoutFailed:true
            }
        )
    })

    it('should handle USER_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                authRequest:true
            }
        )
    })

    it('should handle USER_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_SUCCESS,
                user: {name:'', email:''}
            })
        ).toEqual(
            {
                ...initialState,
                authFailed:false,
                authRequest:false,
                name:'',
                email:''
            }
        )
    })

    it('should handle USER_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                authFailed:true
            }
        )
    })

    it('should handle USER_UPDATE_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                authRequest:true
            }
        )
    })

    it('should handle USER_UPDATE_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_SUCCESS,
                user: {name:'', email:''}
            })
        ).toEqual(
            {
                ...initialState,
                authFailed:false,
                authRequest:false,
                name:'',
                email:''
            }
        )
    })

    it('should handle USER_UPDATE_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                authFailed:true
            }
        )
    })

    it('should handle TOKEN_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.TOKEN_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                tokenRequest:true
            }
        )
    })

    it('should handle TOKEN_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.TOKEN_SUCCESS
            })
        ).toEqual(
            {
                ...initialState,
                tokenFailed:false,
                tokenRequest:false
            }
        )
    })

    it('should handle TOKEN_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.TOKEN_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                tokenFailed:true
            }
        )
    })
})