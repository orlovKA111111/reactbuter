import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { wsReducer } from './socket';
import { wsUserReducer } from './socketUser';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  construct: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  wsr: wsReducer,
  wsru: wsUserReducer
});