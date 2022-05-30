import React from 'react';
import {
    Link,
    useLocation
} from 'react-router-dom';
import style from './BurgerIngredientsStyle.module.css';
import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from 'react-dnd';

import { IIngredientItem } from './types';
import { useAppSelector } from "../../services/hooks";

const ItemIngredient: React.FC<IIngredientItem> = ({ product }) => {
    const location = useLocation();
    const { ingredients, bun } = useAppSelector(
        state => state.construct
    );

    const [{ opacity }, ref] = useDrag({
        type: 'items',
        item: {id:product._id},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const count = React.useMemo(() => {
            let count = 0;
            if (product.type === 'bun') {
                if (bun === product._id) count = 2;
            } else {
                (ingredients != null) && ingredients.forEach(function(item:{id:string, uuid:string}) {
                    if (item.id === product._id) count = count+1;
                })
            }
            return count;
        },
        [bun, ingredients, product]
    );

    return (
        <Link to={{pathname: `/ingredients/${product._id}`, state: { background: location } }} className={style.item + ' mt-6 mb-2'} style={{ opacity }} ref={ref}>
            <div className={style.item + ' mt-6 mb-2'} style={{ opacity }} ref={ref}>
                <img src={product.image} alt={product.name}/>
                <span className={style.price + ' mt-1 mb-1'}><span className="text text_type_digits-default mr-2">{product.price}</span><CurrencyIcon type="primary" /></span>
                <span className={style.name + ' text text_type_main-default'}>{product.name}</span>
                {count > 0 && <Counter count={count} size="default" />}
            </div>
        </Link>
    )
};

export default ItemIngredient;