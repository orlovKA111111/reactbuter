import React from "react";
import { useSelector } from "react-redux";
import style from "./BurgerIngredientsStyle.module.css";
import ItemIngredient from "./ItemIngredient";

import { IIngredients, IStateI, IIngredientsList } from './types';

const IngredientsList = React.forwardRef<HTMLDivElement, IIngredientsList>(({ name, ename }, ref ) => {
    const { items } = useSelector< IStateI, { items: Array<IIngredients> | null }>(
        state => state.ingredients
    );

    return (
        <div ref={ref} className={style.list_item + ' mb-8'}>
            <h2 className="text text_type_main-medium">{name}</h2>
            <div className={style.items}>
                {(items != null) && items.map((product) => (product.type === ename) && <ItemIngredient key={product._id} product={product} />)}
            </div>
        </div>
    )
});

 export default IngredientsList