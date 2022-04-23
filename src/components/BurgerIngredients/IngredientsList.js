import React from "react";
import {useSelector} from "react-redux";
import style from "./BurgerIngredientsStyle.module.css";
import ItemIngredient from "./ItemIngredient";
import PropTypes from "prop-types";



const IngredientsList = React.forwardRef((props, ref ) => {
    const { items } = useSelector(
        state => state.ingredients
    );
    const { name, ename} = props;
    return (
        <div ref={ref} className={style.list_item + ' mb-8'}>
            <h2 className="text text_type_main-medium">{name}</h2>
            <div className={style.items}>
                {items.map((product, index) => (product.type === ename) && <ItemIngredient key={product._id} product={product} />)}
            </div>
        </div>
    )
});

IngredientsList.propTypes = {
    name: PropTypes.string.isRequired,
    ename: PropTypes.string.isRequired
};

export default IngredientsList