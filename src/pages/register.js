import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../services/action/auth';
import styles from './auth.module.css';
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function RegisterPage() {

  const inputRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
  }

  const redirect = () => {
    history.push('/')
  };

  const rregister = e => {
    e.preventDefault();
    dispatch(register(form, redirect));
  };

  if (localStorage.refreshToken) redirect();

  return (
    <div>
      <div className={styles.conteiner + ' pt-20'}>
        <form onSubmit={rregister} >
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <div className="mt-6"><Input type={'text'} placeholder={'Имя'} onChange={onChange} icon={'CurrencyIcon'} value={form.name} name="name" error={false} ref={inputRef} onIconClick={onIconClick} errorText={'Ошибка'} size={'default'} /></div>
          <div className="mt-6"><EmailInput onChange={onChange} value={form.email} name="email" /></div>
          <div className="mt-6"><PasswordInput onChange={onChange} value={form.password} name={'password'} /></div>
          <div className="mt-6"><Button type="primary" size="medium">Зарегистрироваться</Button></div>
        </form>
        <div className="text text_type_main-small text_color_inactive mt-4">Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></div>
      </div>
    </div>
  );
}