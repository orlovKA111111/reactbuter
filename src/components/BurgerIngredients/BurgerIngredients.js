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

    const TabIngradiant =()=> {
        return (
            <div className={style.tab}>
              <Tab value="bun" active={current === 'bun'} onClick={handleClick}>
                    Булки
                </Tab>
                 <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClick}>
                    Начинки
                </Tab>
            </div>
        )
    }

    return (
        <div className='text text_type_main-default'>
            <TabIngradiant ref={ref} onScroll={onScroll} />
            <div className={style.itemIngredientBody}>
                <div>
                    <IngredientsList ref={bunRef} name="Булки" ename="bun"/>
                </div>
                <div>
                    <IngredientsList ref={sauceRef} name="Соусы" ename="sauce" />
                </div>
                <div>
                    <IngredientsList ref={mainRef} name="Начинки" ename="main"/>
                </div>
            </div>
        </div>
    );
}