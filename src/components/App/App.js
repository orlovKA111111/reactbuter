import React from 'react';
import style from './App.module.css';
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import {
    getIngredients,
    RESET_INGREDIENTS_OBJECT } from "../../services/action/ingredients";
import {
    useDispatch,
    useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { RESET_ORDER_OBJECT } from "../../services/action/order";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

export default function App () {

    const { itemObject } = useSelector(
        state => state.ingredients
    );
    const { orderObject } = useSelector(
        state => state.order
    );
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch({type:RESET_INGREDIENTS_OBJECT});
        dispatch({type:RESET_ORDER_OBJECT});
    }

    React.useEffect(
        () => {
            dispatch(getIngredients());
        },
        [dispatch]
    );

    const modalContent = (itemObject != null) ? (<IngredientDetails />) : ((orderObject != null) ? (<OrderDetails />) : null)
    return (
        <div>
            <Header />
            <main>
                <div className={style.conteiner}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients key='1' />
                        <BurgerConstructor key='2'  />
                    </DndProvider>
                </div>
            </main>
            { (modalContent) && (
                <Modal onClose={handleCloseModal}>
                    {modalContent}
                </Modal>
            )}
        </div>
    );
}


