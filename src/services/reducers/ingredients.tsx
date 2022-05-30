import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  IIStateI,
  TIngredientsActions
} from '../action/ingredients';

const initialState : IIStateI = {
  items:null,
  itemsRequest:false,
  itemsFailed:false
};

export const ingredientsReducer = (state = initialState, action : TIngredientsActions) : IIStateI => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...initialState, itemsFailed:true };
    }


    default: {
      return state;
    }
  }
};