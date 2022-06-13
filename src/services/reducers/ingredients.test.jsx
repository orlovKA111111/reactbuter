import { orderReducer } from './order'
import * as types from '../action/order';

const initialState = {
    orders:[],
    orderObject:null,
    orderRequest:false,
    orderFailed:false
};

describe('orderReducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            orderReducer(initialState, {
                type: types.GET_ORDER_REQUEST
            })
        ).toEqual(
            {
                ...initialState,
                orderRequest: true,
                orderObject:{number:0, name:'Ожидайте'}
            }
        )
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            orderReducer(initialState, {
                type: types.GET_ORDER_SUCCESS,
                order: {name:'Name', number:'123456'}
            })
        ).toEqual(
            {
                ...initialState,
                orderFailed:false,
                orderObject:{name:'Name', number:'123456'},
                orders:[{name:'Name', number:'123456'}],
                orderRequest:false
            }
        )
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(
            orderReducer(initialState, {
                type: types.GET_ORDER_FAILED
            })
        ).toEqual(
            {
                ...initialState,
                orderFailed: true
            }
        )
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(
            orderReducer( { ...initialState, orderObject:{name:'Name', number:'123456'} } , {
                type: types.RESET_ORDER_OBJECT
            })
        ).toEqual(
            {
                ...initialState,
                orderObject:initialState.orderObject
            }
        )
    })

})