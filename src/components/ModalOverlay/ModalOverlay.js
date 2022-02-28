import React from 'react'
import style from'./ModalOverlay.module.css'
import {useModal} from "../ModalWithUseEffect/ModalWithUseEffect";

export default function ModalOverlay() {
    const {close} = useModal()
    return  <div onClick={close} className={style.ModalOverlay} />
}