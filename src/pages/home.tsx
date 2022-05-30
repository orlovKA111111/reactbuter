import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import Modal from '../components/Modal/Modal';
import { RESET_ORDER_OBJECT } from '../services/action/order';
import {
  useAppDispatch,
  useAppSelector
} from "../services/hooks";

export const HomePage: React.FC = () =>  {

  const { orderObject } = useAppSelector(
    state => state.order
  );
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    window.history.replaceState(null, '', '/');
    dispatch({type:RESET_ORDER_OBJECT});
  }

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