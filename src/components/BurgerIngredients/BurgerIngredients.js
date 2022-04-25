import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from'./BurgerIngredientsStyle.module.css'

import PropTypes from "prop-types";
import IngredientsList from './IngredientsList'

BurgerIngredients.propTypes ={
    items: PropTypes.object
}

export default function BurgerIngredients() {

    const [current, setCurrent] = React.useState('bun');

    const ref = React.useRef(null);
    const bunRef = React.useRef(null);
    const sauceRef = React.useRef(null);
    const mainRef = React.useRef(null);


    const onScroll = () => {
        const distance = ref.current.getBoundingClientRect().y;
        const bunDistance = Math.abs(distance - bunRef.current.getBoundingClientRect().y);
        const sauceDistance = Math.abs(distance - sauceRef.current.getBoundingClientRect().y);
        const mainDistance = Math.abs(distance - mainRef.current.getBoundingClientRect().y);
        const minTabDistance = Math.min(bunDistance, sauceDistance, mainDistance);
        const activeTab = (minTabDistance === sauceDistance ? 'sauce' : (minTabDistance === mainDistance ? 'main' : 'bun'));
        setCurrent(activeTab);
    };

    const handleClick = (current) => {
        if (current === 'bun') bunRef.current.scrollIntoView(true);
        if (current === 'sauce') sauceRef.current.scrollIntoView(true);
        if (current === 'main') mainRef.current.scrollIntoView(true);
    };

    return (
        <section className={style.wrap + ' mr-10'}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={style.nav + ' mt-5 mb-10'}>
                <Tab value='bun' active={current === 'bun'} onClick={handleClick}>
                    Булки
                </Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={handleClick}>
                    Соусы
                </Tab>
                <Tab value='main' active={current === 'main'} onClick={handleClick}>
                    Начинки
                </Tab>
            </div>
            <div ref={ref} onScroll={onScroll} className={style.list}>
                <IngredientsList ref={bunRef} name="Булки" ename="bun" />
                <IngredientsList ref={sauceRef} name="Соусы" ename="sauce" />
                <IngredientsList ref={mainRef} name="Начинки" ename="main" />
            </div>
        </section>
    );
}