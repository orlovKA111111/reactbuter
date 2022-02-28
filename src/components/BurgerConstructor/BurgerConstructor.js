import React  from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import { useModal } from "../ModalWithUseEffect/ModalWithUseEffect";
import style from "./BurgerConstructor.module.css"

export default function BurgerConstructor(props) {
    const {open} = useModal();
    const arrItems = props.items.data;
    const sumPrice = !arrItems?'':arrItems.map((i) => i.price).reduce((n,s)=> n+s );

    const onOpenPopup = React.useCallback(((event) => {
        const itemsKey = event.currentTarget.getAttribute('name');
        return open(<Modal selectedSum={itemsKey}/>)
    }), [open]);

    function Bulki (props) {
        const n =+ 1;
        return (
            <div  className={style.itemConstructorBody}>
                {!arrItems ?'':(
                    arrItems.map((i, index) =>(i.type !== 'bun'?'':
                            <div key={index+n}>
                            <div className={style.itemConstructor} key={i._id+index+n}>
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
                                {props.children}
                                <div className={style.itemConstructor}  key={i._id+index}>
                                    {i.type === 'bun'?'':<DragIcon type="primary" />}
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
                    ))
                )}
            </div>
        )
    }

    function Bar (){
        return (
            <Bulki>
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
            </Bulki>
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
                <Button className="text text_type_digits-medium" name={sumPrice} onClick={onOpenPopup}  type="primary" size="large">ОФОРМИТЬ</Button>
            </div>
        </div>
    )
}

