import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './home.module.css';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import Modal from '../components/Modal/Modal';

import {
  getIngredients,
  RESET_INGREDIENTS_OBJECT
}  from '../services/action/ingredients';
import { RESET_ORDER_OBJECT } from '../services/action/order';


export function HomePage({ modal }) {

  const { itemObject } = useSelector(
    state => state.ingredients
  );
  const { orderObject } = useSelector(
    state => state.order
  );
  const dispatch = useDispatch();

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
    let modalContent = (itemObject != null) ? (<IngredientDetails />) : ((orderObject != null) ? (<OrderDetails />) : null);
    return modalContent;
  }, [itemObject, orderObject]);
  
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

HomePage.propTypes = {
  modal: PropTypes.bool
};