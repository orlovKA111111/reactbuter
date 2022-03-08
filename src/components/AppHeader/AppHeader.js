import React from 'react';
import { ProfileIcon, Logo, BurgerIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AppHeader.module.css'


export default function  Header() {

        return(
            <header>
                <div className={style.menuBotun}>
                    <BurgerIcon type="primary" />
                    <span className="p-2 text text_type_main-default">
                        Конструктор
                    </span>
                </div>
                <div className={style.menuBotun}>
                    <DragIcon type="primary" />
                    <span className="pl-2 pr-2 pb-2 pt-2 text text_type_main-default">
                        Лента заказов
                    </span>
                </div>
                <div className={style.menuBotun}>
                    <Logo />
                </div>
                <div className={style.menuBotun}>
                    <ProfileIcon type="primary" />
                    <div className='text text_type_main-default'>Личный кабинет</div>
                </div>
            </header>
        )
}
