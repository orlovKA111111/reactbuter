import React from 'react';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerConstructor.module.css"
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from 'react-dnd';
import {
    ADD_BUN_CONSTRUCTOR,
    ADD_INGREDIENT_CONSTRUCTOR,
    MOVE_ITEM_CONSTRUCTOR,
    RESET_CONSTRUCTOR } from '../../services/action/constructor';
import IngredientConstructor from "./IngredientConstructor";
import { getOrderNumber } from "../../services/action/order";
import { v4 as uuidKey } from 'uuid';



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
            itemId.uuid = uuidKey();
            moveItem(itemId)
        },
    });

    const openOrderPopup = () => {
        if (bun != null) {
            const orderIngredient = ingredients.map((i)=>i.id)
            console.log(orderIngredient)

            const orderIngredients = [...orderIngredient, bun, bun];
            console.log(orderIngredients)
            dispatch(getOrderNumber(orderIngredients));
            dispatch({type:RESET_CONSTRUCTOR});
        } else {
            alert('Выберите булку и один инградиент')
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
            item.uuid = uuidKey();
            moveItemSub(item, monitor)
        },
    });

    const sumPrice = React.useMemo(() => {
        let total = 0;
        if (ingredients != null) ingredients.forEach((item) => {
            if (items) {
                const ingredient = items.find(product => item.id === product._id);
                if (ingredient) {
                    total += ingredient.price;
                }
            }
        })
        if (bun != null) {
            if (items) {
                const ingredient = items.find(product => product._id === bun);
                if (ingredient) {
                    total += 2 * ingredient.price;
                }
            }
        }
        return total;
    }, [ingredients, bun, items]);


    return (
        <section ref={dropTarget} className={style.wrap + ' mt-15'}>
            <div className={ style.height+' mt-4'}>
                    {(bun !== null) && <IngredientConstructor
                        id={bun}
                        key={bun.uuid}
                        position='top'
                        k={bun.uuid}
                    />}
                <div className={style.main} ref={dropTargetSub}>
                    {(ingredients.length > 0) && ingredients.map((product, index) =>
                        <IngredientConstructor
                            id={product.id}
                            num={index}
                            key={product.uuid}
                            k={product.uuid}
                        />
                    )}
                </div>
                {(bun !== null) && <IngredientConstructor
                    id={bun}
                    key={bun.uuid}
                    position='bottom'
                    k={bun.uuid}
                />}
            </div>
            <div className={style.footer + ' mt-10'}>
                    <span className={style.total + ' mr-10'}>
                      <span className="text text_type_digits-medium mr-4">{sumPrice}</span>
                        <CurrencyIcon type="primary" />
                    </span>
                    <Button type="primary" size="medium" value="" onClick={openOrderPopup}>
                        Оформить заказ
                    </Button>
            </div>
        </section>
    );
}

