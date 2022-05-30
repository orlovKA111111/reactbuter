import { PayloadAction } from '@reduxjs/toolkit';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';
import { TAuthActions } from './actions/auth';
import { TOrdersActions } from './actions/order';
import { TIngredientsActions } from './actions/ingredients';
import { TConstructorActions } from './actions/constructor';
import { TWSActions } from './actions/wsActions';
import { TWSActionsUser } from './actions/wsActionsUser';


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
};

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