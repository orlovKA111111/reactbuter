import React from "react";
import {useSelector} from "react-redux";
import style from "./BurgerIngredientsStyle.module.css";
import ItemIngredient from "./ItemIngredient";

const IngredientsList = React.forwardRef(({ name, ename }, ref ) => {
    const { items } = useSelector(
        state => state.ingredients
    );

    return (
        <div ref={ref} className={style.list_item + ' mb-8'}>
            <h2 className="text text_type_main-medium">{name}</h2>
            <div className={style.items}>
                {items.map((product) => (product.type === ename) && <ItemIngredient key={product._id} product={product} />)}
            </div>
        </div>
    )
});
 export default IngredientsList