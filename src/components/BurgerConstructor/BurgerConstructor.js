import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import style from "./BurgerConstructor.module.css"
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from 'react-dnd';
import { getIngredients } from "../../services/action/order";
import { ADD_BUN_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, MOVE_ITEM_CONSTRUCTOR, RESET_CONSTRUCTOR } from '../../services/action/constructor';



BurgerConstructor.propTypes ={
    items: PropTypes.object,
    id: PropTypes.string,
    num: PropTypes.number,
    position: PropTypes.string
}

export default function BurgerConstructor(props) {
    const ref = React.useRef(null);
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


    const [, drag] = useDrag({
        type: 'itemsSub',
        item: {id, num, ref},
    });
    drag(ref);

    const deleteIngredient = () => {
        dispatch({type:DELETE_ITEM_CONSTRUCTOR, num:num});
    }
    let product = items.find(item => item._id === id);



    const onOpenPopup = React.useCallback((() => {

        if (bun != null) {
            const orderIngredients = [...ingredients, bun, bun];
            dispatch(getIngredients(orderIngredients));
            dispatch({type:RESET_CONSTRUCTOR});
        }
        return open(
                <Modal>
                    <OrderDetails />
                </Modal>
        )
    }), [open]);


    function Buns () {
        const n =+ 1;
        return (
            <div>
                {
                    product.map((i, index) =>(i.type !== 'bun' |  i._id !== idBun?'':
                            <div key={index+n}>
                            <div className={style.itemConstructor} ref={ref} idkeyitem={i._id}  key={i._id+index+n}>
                                {i.type === 'bun'?'':<DragIcon type="primary" />}
                                <div className={style.itemConstructorTop}>
                                    <ConstructorElement
                                        id={bun}
                                        type = {i.type === 'bun'?'top':''}
                                        isLocked = {i.type === 'bun'?'true':''}
                                        text = {i.name+`${i.type === 'bun'?' (верх)':''}`}
                                        price = {i.price}
                                        thumbnail = {i.image_large}
                                        name = {i.type}
                                    />
                                </div>
                            </div>
                                <div className={style.itemConstructorBody} ref={dropTargetSub}>
                                {props.children}
                                </div>
                                <div className={style.itemConstructor} ref={keyProps} idkeyitem={i._id}  key={i._id+index}>
                                    {i.type === 'bun'?'':<DragIcon type="primary" />}
                                    <div className={style.itemConstructorBottom}>
                                    <ConstructorElement
                                        id={bun}
                                        type = {i.type === 'bun'?'bottom':''}
                                        isLocked = {i.type === 'bun'?'true':''}
                                        text = {i.name+`${i.type === 'bun'?' (низ)':''}`}
                                        price = {i.price}
                                        thumbnail = {i.image_large}
                                        name = {i.type}
                                    />
                                    </div>
                                </div>
                            </div>
                    ))
                }
            </div>
        )
    }

    function Bar (){
        return (
            <Buns>
              {
                  product.map((i, index) =>(i.type === 'bun'?'':
                            <div className={style.itemConstructor} ref={dropTargetSub} idkeyitem={i._id}  key={i._id+index} >
                                {i.type === 'bun'?'':<DragIcon type="primary"  />}
                                <ConstructorElement
                                    type = {i.type === 'bun'?'top':''}
                                    isLocked = {i.type === 'bun'?'true':''}
                                    text = {i.name+`${i.type === 'bun'?' (верх)':''}`}
                                    price = {i.price}
                                    thumbnail = {i.image_large}
                                    name = {i.type}
                                    handleClose={deleteIngredient}
                                />
                            </div>
                    ))
                }
            </Buns>
        )
    }

    return (
        <div ref={dropTarget} >
            <Bar />
            <div className={style.orderButtonPrice}>
                <span className="text text_type_digits-default">
                    {sumPrise}
                </span>
                <div className={style.buttonOrderCreate}>
                    <CurrencyIcon type="primary" size="small"/>
                </div>
                <Button className="text text_type_digits-medium" onClick={onOpenPopup}  type="primary" size="large">ОФОРМИТЬ</Button>
            </div>
        </div>
    )
}

