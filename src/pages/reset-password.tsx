import React from 'react';
import {
  useHistory,
  Link
} from 'react-router-dom';
import { resetPassword } from '../services/action/auth';
import styles from './auth.module.css';
import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch} from "../services/hooks";

export const ResetPasswordPage: React.FC = () => {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const history = useHistory<any>();
  const dispatch = useAppDispatch();
  const [form, setValue] = React.useState<any>({ token: '', password: '' });
  const onChange = (e:{target: HTMLInputElement}) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setTimeout(() => {
      if(inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }
  if ((typeof history.location.state == "undefined") || (!history.location.state.reset)) history.push('/forgot-password');

  const redirect = () => {
    history.push('/')
  };

  const reset = (e:React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword(form, redirect));
  };

  if (localStorage.refreshToken) redirect();

  return (
      <div>
        <div className={styles.conteiner + ' pt-20'}>
          <form onSubmit={reset} >
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <div className="mt-6"><PasswordInput onChange={onChange} value={form.password} name={'password'} /></div>
            <div className="mt-6"><Input type={'text'} placeholder={'Введите код из письма'} onChange={onChange} icon={'CurrencyIcon'} value={form.token} name="token" error={false} ref={inputRef} onIconClick={onIconClick} errorText={'Ошибка'} size={'default'} /></div>
            <div className="mt-6"><Button type="primary" size="medium" name='Сохранить'>Сохранить</Button></div>
          </form>
          <div className="text text_type_main-small text_color_inactive mt-4">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></div>
        </div>
      </div>
  );
}