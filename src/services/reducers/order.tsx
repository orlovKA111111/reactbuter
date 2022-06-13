import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  RESET_ORDER_OBJECT,
  TOrder,
  TOrdersActions
} from '../action/order';


export type TInitialOrderState = {
  orders:Array<TOrder>;
  orderObject:TOrder | null;
  orderRequest:boolean;
  orderFailed:boolean;
};

const initialState : TInitialOrderState = {
  orders:[],
  orderObject:null,
  orderRequest:false,
  orderFailed:false
};

export const orderReducer = (state = initialState, action : TOrdersActions) : TInitialOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest:true,
        orderObject:{number:0, name:'Ожидайте'}
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