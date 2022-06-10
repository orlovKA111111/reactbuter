import {
GET_INGREDIENTS_REQUEST,
GET_INGREDIENTS_SUCCESS,
GET_INGREDIENTS_FAILED,
ADD_INGREDIENTS_OBJECT,
RESET_INGREDIENTS_OBJECT
} from '../action/ingredients';

const initialState = {
    items:[],
    itemsRequest:false,
    itemsFailed:false,
    itemObject:null
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
        }
        case GET_INGREDIENTS_FAILED: {
            return { ...initialState, itemsFailed:true };
        }
        case ADD_INGREDIENTS_OBJECT: {
            return { ...state, itemObject: state.items.find(product => product._id === action.id) };
        }
        case RESET_INGREDIENTS_OBJECT: {
            return { ...state, itemObject:initialState.itemObject };
        }
        default: {
            return state;
        }
    }
};