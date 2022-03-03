import React from 'react'
import style from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalContenxt} from "../ModalWithUseEffect/ModalWithUseEffect";
import PropTypes from 'prop-types'

Modal.propTypes ={
    children: PropTypes.object.isRequired
}

export default function Modal(props) {
    const {control} = React.useContext(ModalContenxt)
    React.useEffect(() => {
        const closeFn = (event) => {
            if(event.key === 'Escape') {
                control.close()
            }
        }

        document.addEventListener('keydown', closeFn)

        return () => {
            document.removeEventListener('keydown', closeFn)
        }
    }, [control.close])

    return (
            <div className='text text_type_main-default'>
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