import React, {useContext, useReducer} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import { useModal } from "../ModalWithUseEffect/ModalWithUseEffect";
import style from "./BurgerConstructor.module.css"
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from 'prop-types'
import {APIContext, APIOrder} from "../../server/context/contextAPI";
import reduse from "../../server/reducers/reduse";

BurgerConstructor.propTypes ={
    items: PropTypes.object.isRequired
}
export default function BurgerConstructor() {
    const items = useContext(APIContext)
    const arrItems = items.data; /*место куда будет передоватся масcив товары котрые будут в конструкторе*/
    const sumPrice = !arrItems?'':arrItems.map((i) => i.price).reduce((n,s)=> n+s )
    const [state] = React.useReducer(reduse, sumPrice )

    const {open} = useModal();
    const [orders, setOrders] = React.useState({
        data: {}
    });
    const onOpenPopup = React.useCallback((() => {
        const idKey = !arrItems?'':arrItems.map((i) => i._id);/*Место куда запихнуть массив с id jn ьлваров*/

            const getOrders = async () => {
                console.log(idKey,'getOrders')
                const res = await fetch(`https://norma.nomoreparties.space/api/orders`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "ingredients": idKey
                    })

                });
                console.log(res,"res")
                console.log(res.ok,"res.ok")
                if (!res.ok){
                    const mes = `Error: ${res.status}`;
                    throw new Error(mes);
                }
                const data = await res.json();
                setOrders({...orders, data: data});
            };
            getOrders().catch(e => {
                alert(e);
            });
            console.log(orders.data.order.number)
        const number = orders.data.order.number;


        return open(
            <APIOrder.Provider value={number}>
                <Modal>
                    <OrderDetails />
                </Modal>
            </APIOrder.Provider>)
    }), [open, arrItems]);


    function Buns (props) {
        const idBun = '60d3b41abdacab0026a733c6'; /*место где будет добовлятся ппервая булка*/
        const n =+ 1;
        return (
            <div>
                {!arrItems ?'':(
                    arrItems.map((i, index) =>(i.type !== 'bun' |  i._id !== idBun?'':
                            <div key={index+n}>
                            <div className={style.itemConstructor} key={i._id+index+n}>
                                {i.type === 'bun'?'':<DragIcon type="primary" />}
                                <div className={style.itemConstructorTop}>
                                    <ConstructorElement
                                        type = {i.type === 'bun'?'top':''}
                                        isLocked = {i.type === 'bun'?'true':''}
                                        text = {i.name+`${i.type === 'bun'?' (верх)':''}`}
                                        price = {i.price}
                                        thumbnail = {i.image_large}
                                        name = {i.type}
                                    />
                                </div>
                            </div>
                                <div className={style.itemConstructorBody}>
                                {props.children}
                                </div>
                                <div className={style.itemConstructor}  key={i._id+index}>
                                    {i.type === 'bun'?'':<DragIcon type="primary" />}
                                    <div className={style.itemConstructorBottom}>

                                    <ConstructorElement
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
                )}
            </div>
        )
    }

    function Bar (){
        return (
            <Buns>
              {!arrItems ?'':(
                    arrItems.map((i, index) =>(i.type === 'bun'?'':
                            <div className={style.itemConstructor} key={i._id+index}>
                                {i.type === 'bun'?'':<DragIcon type="primary" />}
                                <ConstructorElement
                                    type = {i.type === 'bun'?'top':''}
                                    isLocked = {i.type === 'bun'?'true':''}
                                    text = {i.name+`${i.type === 'bun'?' (верх)':''}`}
                                    price = {i.price}
                                    thumbnail = {i.image_large}
                                    name = {i.type}
                                />
                            </div>
                    ))
                )}
            </Buns>
        )
    }

    return (
        <div>
            <Bar />
            <div className={style.orderButtonPrice}>
                <span className="text text_type_digits-default">
                    {sumPrice}
                </span>
                <div className={style.buttonOrderCreate}>
                    <CurrencyIcon type="primary" size="small"/>
                </div>
                <Button className="text text_type_digits-medium" onClick={onOpenPopup}  type="primary" size="large">ОФОРМИТЬ</Button>
            </div>
        </div>
    )
}

