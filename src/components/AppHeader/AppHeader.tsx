import React from 'react';
import style from './AppHeader.module.css'
import {
    NavLink,
    Link,
    useLocation
} from 'react-router-dom';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


const Header: React.FC = () => {

    const { pathname } = useLocation<any>();
    return (
        <header className="mb-10">
            <div className={style.conteiner}>
                <nav className="pt-4 pb-4 text text_type_main-default">
                    <ul className={style.menu}>
                        <li className={style.menu_item}><NavLink to='/' className={style.link} activeClassName={style.active}><BurgerIcon type={ (pathname === '/') ? 'primary' : 'secondary' } /><span className="ml-2">Конструктор</span></NavLink></li>
                        <li className={style.menu_item}><NavLink to='/lenta' className={style.link} activeClassName={style.active}><ListIcon type={ (pathname === '/lenta') ? 'primary' : 'secondary' } /><span className="ml-2">Лента заказов</span></NavLink></li>
                    </ul>
                </nav>
                <Link to=''><Logo /></Link>
                <div className={style.auth}>
                    <NavLink to='/profile' className={style.link} activeClassName={style.active}><ProfileIcon type={ (pathname === '/profile') ? 'primary' : 'secondary' } /><span className="ml-2 text text_type_main-default">Личный кабинет</span></NavLink>
                </div>
            </div>
        </header>
    );
}
export default Header
