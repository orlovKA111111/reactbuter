import React  from 'react';
import PropTypes from 'prop-types';
import style from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as key } from 'uuid';
import { DELETE_ITEM_CONSTRUCTOR } from '../../services/action/constructor';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

ConstructorIngredient.propTypes = {
    id: PropTypes.string.isRequired,
    num: PropTypes.number,
    position: PropTypes.string,
    ingredients: PropTypes.object
};

export default function ConstructorIngredient  ({id, num, position}) {
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
            <ConstructorElement text={product.name + ((position === 'top') ? ' (верх)' : ' (низ)')}
                                isLocked={true}
                                price={product.price}
                                thumbnail={product.image}
                                type={position} />
        )
    } else {
        return (
            <div className={style.item} ref={ref} key={key()}>
                <DragIcon type="primary" />
                <ConstructorElement text={product.name} price={product.price} thumbnail={product.image} handleClose={deleteIngredient}  />
            </div>
        )
    }
};