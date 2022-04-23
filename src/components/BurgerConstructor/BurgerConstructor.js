import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import style from "./BurgerConstructor.module.css"
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from 'react-dnd';
import { getOrder } from "../../services/action/order";
import { ADD_BUN_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, MOVE_ITEM_CONSTRUCTOR, RESET_CONSTRUCTOR } from '../../services/action/constructor';
import IngredientsConstructor from "./IngredientsConstructor";
import { useModal } from "../ModalWithUseEffect/ModalWithUseEffect";



BurgerConstructor.propTypes ={
    items: PropTypes.object,
    id: PropTypes.string,
    num: PropTypes.number,
    position: PropTypes.string
}

export default function BurgerConstructor() {
    const {open} = useModal()

    const { items } = useSelector(
        state => state.ingredients
    );
    const { ingredients, bun } = useSelector(
        state => state.construct
    );
    console.log(ingredients,'ingredients')

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

    const sumPrise = React.useMemo(() => {
        let total = 0;
        if (ingredients.length > 0) ingredients.map((item) => total += items.find(product => item === product._id).price);
        if (bun != null) {
            total += 2 * items.find(product => product._id === bun).price;
        }
        return total;
    }, [ingredients, bun, items]);

    const onOpenPopup = React.useCallback((() => {
        let order = 0;
        console.log(...ingredients)
       if (bun != null) {
            const orderIngredients = [...ingredients, bun, bun];
            order = dispatch(getOrder(orderIngredients));
        }
        return open(
                <Modal>
                    <OrderDetails order={{order}} />
                </Modal>
        )
    }), [open, ingredients, bun]);

    return (
        <section ref={dropTarget} className={style.itemConstructor + ' mt-15'}>
                <div className=' mt-4'>
                    {(bun != null) && <IngredientsConstructor id={bun} position='top' /> }
                    <div  ref={dropTargetSub}>
                        {(ingredients.length > 0) && ingredients.map((product, index) =>
                            <IngredientsConstructor
                                id={product}
                                num={index}
                                key={index}
                            />
                        )}
                    </div>
                    {(bun != null) && <IngredientsConstructor id={bun} position='bottom' />}
                </div>
                <div className={style.orderButtonPrice}>
                    <span className="text text_type_digits-default">
                        {sumPrise}
                    </span>
                    <div className={style.buttonOrderCreate}>
                        <CurrencyIcon type="primary" size="small"/>
                    </div>
                    <Button className="text text_type_digits-medium" onClick={onOpenPopup}  type="primary" size="large">ОФОРМИТЬ</Button>
                </div>
        </section>
    )
}

