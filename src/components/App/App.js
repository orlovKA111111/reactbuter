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
import {APIContext, BaseUrl} from "../../server/context/contextAPI";

export default function App () {
        const [items, setItems] = React.useState({
            data: {},
        });
        const url = "https://norma.nomoreparties.space/api/"
    React.useEffect(() => {

               const getIngredients = async () => {
                const res = await fetch(url+"ingredients");
                if (!res.ok){
                    const mes = `Error: ${res.status}`;
                    throw new Error(mes);
                }

                   const data = await res.json();
                   setItems({...items, data: data});
            };
            getIngredients().catch(e => {
                alert(e.mes);
            });
        },[url])

    console.log(items)
    return (
        <BaseUrl.Provider value={url}>
        <APIContext.Provider value={items.data}>
        <ModalContenxt.Provider value={modalControl}>
            <div className={style.App} >
                <Header />
                <div className={style.AppBodyBurger}>
                    <div className={style.AppBlock}>
                        <h1>Собери бургер</h1>
                        <BurgerIngredients />
                    </div>
                    <div className={style.AppBlockConstructor}>
                        <BurgerConstructor />
                    </div>
                </div>
            </div>
            <div id="modals"></div>
            <ModalWithUseEffect />
        </ModalContenxt.Provider>
        </APIContext.Provider>
        </BaseUrl.Provider>
    );
}


