import { combineReducers } from 'redux';
import { ingredientsReducer } from '../reducers/ingredients';
import { constructorReducer } from '../reducers/constructor';
import { orderReducer } from '../reducers/order';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    construct: constructorReducer,
    order: orderReducer
});