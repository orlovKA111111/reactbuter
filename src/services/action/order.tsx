import { getAPIOrderNumber } from '../../utlls/api';
import { AppThunk, AppDispatch } from '../types';

export const GET_ORDER_REQUEST : 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS : 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED : 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const RESET_ORDER_OBJECT : 'RESET_ORDER_OBJECT' = 'RESET_ORDER_OBJECT';


export type TOrder = {
  name:string,
  number:number
};

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS,
           order: TOrder
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED
}
export interface IResetOrderFailed {
  readonly type: typeof RESET_ORDER_OBJECT
}



export type TOrdersActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IResetOrderFailed;


export const getOrder : AppThunk = (ingredients : Array<string>)  => {
  return function(dispatch : AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getAPIOrderNumber(ingredients)
      .then((res) => {
        if (res && res.success) {
	      dispatch({
	        type: GET_ORDER_SUCCESS,
	        order: {name:res.name, number:res.order.number}
	      });
	    } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_ORDER_FAILED
        })
      );
  };
}