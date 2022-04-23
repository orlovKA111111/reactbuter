import style from "./BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import {DELETE_ITEM_CONSTRUCTOR} from "../../services/action/constructor";

export default function IngredientsConstructor(id, num, position){
    const ref = React.useRef(null);
    const { items } = useSelector(
        state => state.ingredients
    );
    const dispatch = useDispatch();
    const [, drag] = useDrag({
        type: 'itemsSub',
        item: {id, num, ref},
    });
    drag(ref);
    const deleteIngredient = () => {
        dispatch({type:DELETE_ITEM_CONSTRUCTOR, num:num});
    }
    var product = items.find(item => item._id === id);
    if (position) {
        return (
            <ConstructorElement text={product.name + ((position === 'top') ? ' (верх)' : ' (низ)')} isLocked={true} price={product.price} thumbnail={product.image} type={position} />
        )
    } else {
        return (
            <div className={style.item} ref={ref} key={num}>
                <DragIcon type="primary" />
                <ConstructorElement text={product.name} price={product.price} thumbnail={product.image} handleClose={deleteIngredient}  />
            </div>
        )
    }
}