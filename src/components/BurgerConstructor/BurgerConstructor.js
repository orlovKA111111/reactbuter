import React from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerConstructor.module.css"
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from 'react-dnd';
import {
    ADD_BUN_CONSTRUCTOR,
    ADD_INGREDIENT_CONSTRUCTOR,
    MOVE_ITEM_CONSTRUCTOR,
    RESET_CONSTRUCTOR } from '../../services/action/constructor';
import IngredientConstructor from "./IngredientConstructor";
import { getOrderNumber } from "../../services/action/order";
import { v4 as key } from 'uuid';


BurgerConstructor.propTypes ={
    items: PropTypes.object,
    id: PropTypes.string,
    num: PropTypes.number,
    position: PropTypes.string,
}

export default function BurgerConstructor() {

    const { items } = useSelector(
        state => state.ingredients
    );
    const { ingredients, bun } = useSelector(
        state => state.construct
    );
    const dispatch = useDispatch();
    const moveItem = (item) => {
        const type = items.find(product => product._id === item.id).type;
        if (type === 'bun') {
            dispatch({
                type: ADD_BUN_CONSTRUCTOR,
                ...item
            });
        } else {
            dispatch({
                type: ADD_INGREDIENT_CONSTRUCTOR,
                ...item
            });
        }
    };

    const [, dropTarget] = useDrop({
        accept:'items',
        drop(itemId) {
            moveItem(itemId)
        },
    });

    const openOrderPopap = () => {
        if (bun != null) {
            const orderIngredients = [...ingredients, bun, bun];
            dispatch(getOrderNumber(orderIngredients));
            dispatch({type:RESET_CONSTRUCTOR});
        }
    }

    const moveItemSub = (item, monitor) => {
        const dist = monitor.getClientOffset().y - item.ref.current.getBoundingClientRect().y;
        const newPos = item.num + Math.floor(dist/100);
        dispatch({
            type: MOVE_ITEM_CONSTRUCTOR,
            id: item.id,
            pos: item.num,
            newPos: newPos
        });
    };

    const [, dropTargetSub] = useDrop({
        accept: 'itemsSub',
        drop: (item, monitor) =>  {
            moveItemSub(item, monitor)
        },
    });

    const sumPrice = React.useMemo(() => {
        let total = 0;
        if (ingredients.length > 0) ingredients.map((item) => total += items.find(product => item === product._id).price);
        if (bun != null) {
            total += 2 * items.find(product => product._id === bun).price;
        }
        return total;
    }, [ingredients, bun, items]);


    return (
        <section ref={dropTarget} className={style.wrap + ' mt-15'}>
            <div className={' mt-4'}>
                {(bun != null) && <IngredientConstructor id={bun} position='top' /> }
                <div className={style.main} ref={dropTargetSub}>
                    {(ingredients.length > 0) && ingredients.map((product, index) =>
                        <IngredientConstructor
                            id={product}
                            num={index}
                            key={key()}
                        />)}
                </div>
                {(bun != null) && <IngredientConstructor id={bun} position='bottom' />}
            </div>
            <div className={style.footer + ' mt-10'}>
                    <span className={style.total + ' mr-10'}>
                      <span className="text text_type_digits-medium mr-4">{sumPrice}</span>
                        <CurrencyIcon type="primary" />
                    </span>
                    <Button type="primary" size="medium" value="" onClick={openOrderPopap}>
                        Оформить заказ
                    </Button>
            </div>
        </section>
    );
}

