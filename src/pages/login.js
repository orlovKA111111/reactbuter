import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { login } from '../services/action/auth';
import styles from './auth.module.css';
import {
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  
  const { logoutRequest } = useSelector(
    state => state.auth
  );
  const dispatch = useDispatch();
  const [form, setValue] = React.useState({ email: '', password: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const loginAuth = e => {
    e.preventDefault();
    dispatch(login(form));
  }
  
  return (
    <div>
      {(localStorage.refreshToken && !logoutRequest) ? (<Redirect to='/' />) : (
      <div className={styles.conteiner + ' pt-20'}>
        <form onSubmit={loginAuth} >
          <h1 className="text text_type_main-medium">Вход</h1>
          <div className="mt-6"><EmailInput onChange={onChange} value={form.email} name="email" /></div>
          <div className="mt-6"><PasswordInput onChange={onChange} value={form.password} name={'password'} /></div>
          <div className="mt-6"><Button type="primary" size="medium">Войти</Button></div>
        </form>
        <div className="text text_type_main-small text_color_inactive mt-20">Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link></div>
        <div className="text text_type_main-small text_color_inactive mt-4">Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link></div>
      </div>
      )};
    </div>
  )
}