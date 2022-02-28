import React from 'react';
import style from './App.module.css';
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../burgerIngredients/BurgerIngredients"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import {
    ModalWithUseEffect,
    ModalContenxt,
    modalControl
} from "../ModalWithUseEffect/ModalWithUseEffect";




import Modal from "../Modal/Modal";

export default function App () {
        const [state, setState] = React.useState({
            data: []
        });


    React.useEffect(() => {
               const getIngredients = async () => {
                const res = await fetch("https://norma.nomoreparties.space/api/ingredients");
                if (!res.ok){
                    const mes = `Error: ${res.status}`;
                    throw new Error(mes);
                }
                const data = await res.json();
                setState({...state, data: data});
            };
            return getIngredients().catch(e => {
                alert(e.mes);
            });
        },[])

    return (
        <ModalContenxt.Provider value={modalControl}>
            <div className={style.App} >
                <Header />
                <div className={style.AppBodyBurger}>
                    <div className={style.AppBlock}>
                        <h1>Собери бургер</h1>
                        <BurgerIngredients items={state.data} />
                    </div>
                    <div className={style.AppBlockConstructor}>
                        <BurgerConstructor items={state.data} />
                    </div>
                </div>
            </div>
            <ModalWithUseEffect />
        </ModalContenxt.Provider>
    );
}


