import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import Modal from '../components/Modal/Modal';

import {
  getIngredients,
  RESET_INGREDIENTS_OBJECT
}  from '../services/action/ingredients';
import { RESET_ORDER_OBJECT } from '../services/action/order';


interface IState {
  order:{
    orders:[],
    orderObject:IOrderObject|null,
    orderRequest:boolean,
    orderFailed:boolean
  }
}

interface IOrderObject {
  name:string,
  number:number
}

export const HomePage: React.FC = () => {

  const orderObject = useSelector<IState, IOrderObject | null>(
      state => state.order.orderObject
  );
  const dispatch = useDispatch<any>();

  const handleCloseModal = () => {
    window.history.replaceState(null, '', '/');
    dispatch({type:RESET_INGREDIENTS_OBJECT});
    dispatch({type:RESET_ORDER_OBJECT});
  }

  React.useEffect(
      () => {
        dispatch(getIngredients());
      },
      [dispatch]
  );


  const modalContent = React.useMemo(() => {
    let modalContent = (orderObject != null) ? <OrderDetails /> : null;
    return modalContent;
  }, [orderObject]);

  return (
      <div>
        <main>
          <div className={styles.conteiner}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients key='1' />
              <BurgerConstructor key='2' />
            </DndProvider>
          </div>
        </main>
        { (modalContent != null) && (
            <Modal onClose={handleCloseModal}>
              {modalContent}
            </Modal>
        )}
      </div>
  );
}
