import React from 'react'
import style from './Modal.module.css'
import OrderDetails from "../OrderDetails/OrderDetails";
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import IngredientDetails from "../IngredientDetails/IngredientDetails"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useModal} from "../ModalWithUseEffect/ModalWithUseEffect";

export default function Modal(props) {
    const {close} = useModal()
    React.useEffect(() => {
        const closeFn = (event) => {
            if(event.key === 'Escape') {
                close()
            }
        }

        document.addEventListener('keydown', closeFn)

        return () => {
            document.removeEventListener('keydown', closeFn)
        }
    }, [close])


    return (
            <div>
                <ModalOverlay />
                <div title='Бургер' className={style.Modal} >
                    <div  className={style.OrderClose}>
                        <CloseIcon onClick={close} type="primary" />
                    </div>
                    {props.selectedSum?<OrderDetails />:null}
                    {props.selectedItem?<IngredientDetails />:null}
                </div>
            </div>

    );
}