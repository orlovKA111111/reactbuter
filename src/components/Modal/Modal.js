import React from 'react'
import style from './Modal.module.css'
import OrderDetails from "../OrderDetails/OrderDetails";
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import IngredientDetails from "../IngredientDetails/IngredientDetails"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalContenxt} from "../ModalWithUseEffect/ModalWithUseEffect";

export default function Modal(props) {
    const {control} = React.useContext(ModalContenxt)

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
                        <CloseIcon onClick={control.close} type="primary" />
                    </div>
                    {props.children}
                </div>
            </div>
    );
}