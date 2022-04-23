import React, {useMemo} from 'react';
import styles from './BurgerIngredientsStyle.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_INGREDIENTS_OBJECT } from '../../services/action/ingredients';
import { useDrag } from 'react-dnd';
import { useModal } from "../ModalWithUseEffect/ModalWithUseEffect";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";


ItemIngredient.propTypes = {
    product: PropTypes.object
};

export default function ItemIngredient ({ product }) {
    const dispatch = useDispatch();
    const { ingredients, bun } = useSelector(
        state => state.construct
    );
    const {open} = useModal()

    const [{ opacity }, ref] = useDrag({
        type: 'items',
        item: {id:product._id},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const count = useMemo(() => {
            let count = 0;
            if (product.type === 'bun') {
                if (bun === product._id) count = 2;
            } else {
                ingredients.forEach(function(item) {
                    if (item === product._id) count = count+1;
                })
            }
            return count;
        },
        [bun, ingredients, product]
    );

/*
    <div className={styles.item + ' mt-6 mb-2'} style={{ opacity }} onClick={openIngredintCard} ref={ref}>
        <img src={product.image} alt={product.name}/>
        <span className={styles.price + ' mt-1 mb-1'}><span className="text text_type_digits-default mr-2">{product.price}</span><CurrencyIcon type="primary" /></span>
        <span className={styles.name + ' text text_type_main-default'}>{product.name}</span>
        {count > 0 && <Counter count={count} size="default" />}
    </div>*/
    const onOpenPopup = React.useCallback((() => {
        dispatch({type:ADD_INGREDIENTS_OBJECT, id:product._id});
        return open(
            <Modal>
                <IngredientDetails ingredients={product}/>
            </Modal>
        )
    }), [open, product])


    return (
        <div className={styles.cadItems} style={{ opacity }} onClick={onOpenPopup}  ref={ref}>
            <div key={product._id}  className={styles.item}>
                {count > 0 && <Counter count={count} size="default" />}
                <img className={styles.imgItem} src={product.image}/>
                <div className={styles.priceItemsImg}>
                    <span className='text text_type_digits-default'>{product.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span>{product.name}</span>
            </div>
        </div>
    )
};
