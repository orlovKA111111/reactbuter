import React from 'react'
import style from'./ModalOverlay.module.css'
import {ModalContenxt} from "../ModalWithUseEffect/ModalWithUseEffect";

export default function ModalOverlay() {
    const {control} = React.useContext(ModalContenxt)
    return  <div onClick={control.close} className={style.ModalOverlay} />
}