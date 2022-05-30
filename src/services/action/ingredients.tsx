import { getAPIIngredients } from '../../utlls/api';
import { AppThunk, AppDispatch } from '../types';

export const GET_ITEMS_REQUEST : 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS : 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED : 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export interface IIngredients {
  __v:number;
  _id:string;
  calories:number;
  carbohydrates:number;
  fat:number;
  image:string;
  image_large:string;
  image_mobile:string;
  name:string;
  price:number;
  proteins:number;
  type:string;
};

export interface IIStateI {
  items:Array<IIngredients> | null,
  itemsRequest:boolean,
  itemsFailed:boolean,
};


export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS
           items: Array<IIngredients>  
}
export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed;

export const getItems : AppThunk = () => {
  return function(dispatch : AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getAPIIngredients()
      .then((res) => {
        if (res && res.success) {
	      dispatch({
	        type: GET_ITEMS_SUCCESS,
	        items: res.data
	      });
	    } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_ITEMS_FAILED
        })
      );
  };
}
