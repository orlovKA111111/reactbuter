import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { wsActions } from './services/actions/wsActions';
import { wsActionsUser } from './services/actions/wsActionsUser';
import { socketMiddleware } from './services/middleware';
import { rootReducer } from './services/reducers';
import { WS_URL_ALL, WS_URL_OWNER } from './utils/constants';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_URL_OWNER, wsActionsUser, true),
    socketMiddleware(WS_URL_ALL, wsActions, false)
  )
);

export const store = createStore(rootReducer, enhancer);