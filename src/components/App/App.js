import React from 'react';
import style from './App.module.css';
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import {
    ModalWithUseEffect,
    ModalContenxt,
    modalControl
} from "../ModalWithUseEffect/ModalWithUseEffect";
import { getIngredients } from "../../services/action/ingredients";
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


export default function App () {

    const dispatch = useDispatch();

    React.useEffect(()=>{
        console.log(getIngredients(), 'getIngredients')
        dispatch(getIngredients())
    }, [dispatch]);

    return (
            <ModalContenxt.Provider value={modalControl}>
                <div className={style.App} >
                    <Header />
                    <div className={style.AppBodyBurger}>
                        <DndProvider backend={HTML5Backend}>
                            <div className={style.AppBlock}>
                                <h1>Собери бургер</h1>
                                <BurgerIngredients />
                            </div>
                            <div className={style.AppBlockConstructor}>
                                <BurgerConstructor />
                            </div>
                        </DndProvider>

                    </div>
                </div>
                <ModalWithUseEffect />
            </ModalContenxt.Provider>
    );
}


