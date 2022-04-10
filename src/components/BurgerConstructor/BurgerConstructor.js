import React from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import { useModal } from "../ModalWithUseEffect/ModalWithUseEffect";
import style from "./BurgerConstructor.module.css"
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from 'prop-types'
import {APIContext, APIOrder, BaseUrl} from "../../server/context/contextAPI";
import reduse from "../../server/reducers/reduse";

BurgerConstructor.propTypes ={
    items: PropTypes.object
}
export default function BurgerConstructor() {
    const items = React.useContext(APIContext)
    const arrItems = items.data; /*место куда будет передоватся масcив товары котрые будут в конструкторе*/
    const sumPrice = !arrItems?'':arrItems.map((i) => i.price).reduce((n,s)=> n+s )
    const [state] = React.useReducer(reduse, sumPrice)
    const {open} = useModal();


    const onOpenPopup = React.useCallback((() => {

        const div1 = document.getElementsByClassName(style.itemConstructor);
        const arrKey = Array.from(div1)
        const arrKeyt = arrKey.map((i) => i.getAttribute("idkeyitem"))



        return open(
            <APIOrder.Provider value={arrKeyt}>
                <Modal>
                    <OrderDetails />
                </Modal>
            </APIOrder.Provider>
        )
    }), [open]);


    function Buns (props) {
        const idBun = '60d3b41abdacab0026a733c6'; /*место где будет добовлятся ппервая булка*/
        const n =+ 1;
        return (
            <div>
                {!arrItems ?'':(
                    arrItems.map((i, index) =>(i.type !== 'bun' |  i._id !== idBun?'':
                            <div key={index+n}>
                            <div className={style.itemConstructor} id='div1' idkeyitem={i._id} key={i._id+index+n}>
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
                                <div className={style.itemConstructor} id='div1' idkeyitem={i._id} key={i._id+index}>
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
                            <div className={style.itemConstructor} id='div1' idkeyitem={i._id} key={i._id+index}>
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

