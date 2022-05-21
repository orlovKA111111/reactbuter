import React  from 'react';
import style from './BurgerConstructor.module.css';
import {
    ConstructorElement,
    DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_ITEM_CONSTRUCTOR } from '../../services/action/constructor';
import {
    useDispatch,
    useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { IIngredients, IStateI, IConstructorIngredient } from './types';




export const IngredientConstructor: React.FC <IConstructorIngredient> = ({id, num, position, k}) =>  {
    const ref = React.useRef(null);
    const { items } = useSelector<IStateI, { items: Array<IIngredients> | null }>(
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