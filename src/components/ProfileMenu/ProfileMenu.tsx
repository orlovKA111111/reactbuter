import React, { SyntheticEvent } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { logout } from '../../services/action/auth';
import styles from './ProfileMenu.module.css';


function ProfileMenu() {
  
  const history = useHistory();
  const dispatch = useDispatch();

  const redirect = () => {
    history.push('/login')
  };

  const llogout = (e:SyntheticEvent) => {
    e.preventDefault();
    dispatch(logout(redirect));
  };

  return (
    <ul className={styles.menu}>
      <li className={styles.item + ' text text_type_main-medium'}><NavLink to="/profile" className={styles.link + ' text_color_inactive'} activeClassName={styles.active_link} exact>Профиль</NavLink></li>
      <li className={styles.item + ' text text_type_main-medium'}><NavLink to="/profile/orders" className={styles.link + ' text_color_inactive'} activeClassName={styles.active_link} exact>История заказов</NavLink></li>
      <li className={styles.item + ' text text_type_main-medium'} onClick={llogout}><span className={styles.link + ' text_color_inactive'}>Выйти</span></li>
    </ul>
  );
}

export default ProfileMenu;
