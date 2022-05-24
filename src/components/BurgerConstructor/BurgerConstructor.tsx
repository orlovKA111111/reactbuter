import React from 'react';
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './BurgerConstructor.module.css'
import { useHistory } from 'react-router-dom';

import {
    useSelector,
    useDispatch
} from "react-redux";

import { useDrop } from 'react-dnd';

import {
    ADD_BUN_CONSTRUCTOR,
    ADD_INGREDIENT_CONSTRUCTOR,
    MOVE_ITEM_CONSTRUCTOR,
    RESET_CONSTRUCTOR
} from '../../services/action/constructor';

import IngredientConstructor from "./IngredientConstructor";
import { getOrderNumber } from "../../services/action/order";
import { v4 as uuidKey } from 'uuid';

import { IIngredients, IStateI, IStateC } from './types';

const BurgerConstructor: React.FC = () =>  {

    const { items } = useSelector<IStateI, { items: Array<IIngredients> | null }>(
        state => state.ingredients
    );
    const { ingredients, bun } = useSelector< IStateC, { ingredients:Array<{id:string, uuid:string}>|null, bun:string|null } >(
        state => state.construct
    );
    const dispatch = useDispatch<any>();
    const history = useHistory();

    const moveItem = (item:{id:string, uuid:string}) => {
        if (items) {
            const ingredient = items.find((product) => product._id === item.id);
            if (ingredient) {
                const type:string = ingredient.type;
                if (type === 'bun') {
                    dispatch({
                        type: ADD_BUN_CONSTRUCTOR,
                        ...item
                    })
                } else {
                    dispatch({
                        type: ADD_INGREDIENT_CONSTRUCTOR,
                        ...item
                    })
                }
            }
        }
    };

    const [, dropTarget] = useDrop({
        accept:'items',
        drop(itemId:{id:string, uuid:string}) {
            itemId.uuid = uuidKey();
            moveItem(itemId)
        },
    });

    const openOrderPopup = () => {
        if (localStorage.refreshToken) {
            if (bun != null) {
                const orderIngredients = (ingredients != null) ? [...ingredients.map(item => item.id), bun, bun] : [bun, bun];
                dispatch(getOrderNumber(orderIngredients));
                dispatch({type:RESET_CONSTRUCTOR});
            }
        } else {
            history.push('/login');
        }
    }

    const moveItemSub = (item:{id:string,num:number,ref:any }, monitor:any) => {
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
        drop: (item:{id:string,num:number,ref:HTMLDivElement}, monitor:any) =>  {
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
                        position='top'
                    />}
                <div className={style.main} ref={dropTargetSub}>
                    {(ingredients != null) && ingredients.map((product, index) =>
                        <IngredientConstructor
                            id={product.id}
                            num={index}
                            k={product.uuid}
                            key={product.uuid}
                        />
                    )}
                </div>
                {(bun !== null) && <IngredientConstructor
                    id={bun}
                    position='bottom'
                />}
            </div>
            <div className={style.footer + ' mt-10'}>
                    <span className={style.total + ' mr-10'}>
                      <span className="text text_type_digits-medium mr-4">{sumPrice}</span>
                        <CurrencyIcon type="primary" />
                    </span>
                    <Button type="primary" size="medium" onClick={openOrderPopup} >
                        Оформить заказ
                    </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;