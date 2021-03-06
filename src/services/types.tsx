import { PayloadAction } from '@reduxjs/toolkit';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';
import { TAuthActions } from './action/auth';
import { TOrdersActions } from './action/order';
import { TIngredientsActions } from './action/ingredients';
import { TConstructorActions } from './action/constructor';
import { TWSActions } from './action/wsActions';
import { TWSActionsUser } from './action/wsActionsUser';


export type TWsActions = {
  wsInit: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  name: string;
  status: string;
  number: string;
  createdAt: string;
  updatedAt: string;
  price:number;
};
export type TFilterOrder = {

}

export type TWSData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TInitialSocketState = {
  wsConnected: boolean;
  data: TWSData;
  error?: PayloadAction | null;
};


export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TIngredientsActions
  | TConstructorActions
  | TOrdersActions
  | TAuthActions
  | TWSActions
  | TWSActionsUser;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;