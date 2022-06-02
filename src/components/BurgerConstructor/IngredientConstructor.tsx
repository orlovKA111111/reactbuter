import React  from 'react';
import style from './BurgerConstructor.module.css';
import {
    ConstructorElement,
    DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_ITEM_CONSTRUCTOR } from '../../services/action/constructor';

import { useDrag } from 'react-dnd';
import { IConstructorIngredient } from './types';
import {
    useAppDispatch,
    useAppSelector
} from "../../services/hooks";




export const IngredientConstructor: React.FC <IConstructorIngredient> = ({id, num, position, k}) =>  {
    const ref = React.useRef<HTMLDivElement>(null);
    const { items } = useAppSelector(
        state => state.ingredients
    );

    const dispatch = useAppDispatch();
    const [, drag] = useDrag({
        type: 'itemsSub',
        item: {id, num, ref},
    });
    drag(ref);
    const deleteIngredient = () => {
        dispatch({type:DELETE_ITEM_CONSTRUCTOR, num:num});
    }
    const product = (items != null) && items.find(item => item._id === id);
    const price:number = (product && product.price) ? product.price : 0;
    const image = (product && product.image) ? product.image : '';
    const name:string = (product && product.name) ? product.name + ((position === 'top') ? ' (верх)' : ' (низ)') : '';

    if (position) {

        return (
            <div className={style.item} ref={ref} key={k}>
            <ConstructorElement
                text={name + ((position === 'top') ? ' (верх)' : ' (низ)')}
                isLocked={true}
                price={price}
                thumbnail={image}
                type={position}
            />
            </div>
        )
    } else {
        return (
            <div className={style.item} ref={ref} key={k}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={deleteIngredient}
                />
            </div>
        )
    }
};
export default IngredientConstructor;