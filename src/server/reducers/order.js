import {
GET_ORDER_REQUEST,
GET_ORDER_SUCCESS,
GET_ORDER_FAILED,
RESET_ORDER_OBJECT
} from '../action/order';

const initialState = {
    orders:[],
    orderRequest:false,
    orderFailed:false
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                ordersRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return { ...state, orderFailed:false, orderObject:action.order, orders:[...state.orders, action.order], orderRequest:false };
        }
        case GET_ORDER_FAILED: {
            return { ...initialState, orderFailed:true };
        }
        case RESET_ORDER_OBJECT: {
            return { ...state, orderObject:initialState.orderObject };
        }
        default: {
            return state;
        }
    }
};