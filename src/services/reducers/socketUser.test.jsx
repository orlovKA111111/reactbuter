import { wsUserReducer } from './socketUser'
import * as types from '../action/wsActionsUser';

const initialState = {
    wsConnected: false,
    data: { orders: [], total: 0, totalToday: 0 },
};

describe('wsUserReducer', () => {
    it('should return the initial state', () => {
        expect(wsUserReducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle WS_CONNECTION_SUCCESS_USER', () => {
        expect(
            wsUserReducer(initialState, {
                type: types.WS_CONNECTION_SUCCESS_USER
            })
        ).toEqual(
            {
                ...initialState,
                wsConnected: true,
                error: undefined
            }
        )
    })

    it('should handle WS_CONNECTION_ERROR_USER', () => {
        expect(
            wsUserReducer(initialState, {
                type: types.WS_CONNECTION_ERROR_USER,
                payload: 'Error'
            })
        ).toEqual(
            {
                ...initialState,
                wsConnected: false,
                error: 'Error'
            }
        )
    })

    it('should handle WS_CONNECTION_CLOSED_USER', () => {
        expect(
            wsUserReducer(initialState, {
                type: types.WS_CONNECTION_CLOSED_USER
            })
        ).toEqual(
            {
                ...initialState,
                error: undefined,
                wsConnected: false,
            }
        )
    })

    it('should handle WS_GET_MESSAGE_USER', () => {
        expect(
            wsUserReducer(initialState, {
                type: types.WS_GET_MESSAGE_USER,
                payload: {
                    orders: {},
                    total: 1234,
                    totalToday: 30
                }
            })
        ).toEqual(
            {
                ...initialState,
                error: undefined,
                data: {
                    orders: {},
                    total: 1234,
                    totalToday: 30
                },
            }
        )
    })

})