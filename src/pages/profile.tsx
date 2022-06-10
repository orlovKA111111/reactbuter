import React, {
  useState,
  useRef,
  useEffect,
  FC,
  SyntheticEvent
} from 'react';

import {
  getAuth,
  updateAuth,
  } from '../services/action/auth';
import styles from './profile.module.css';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  useAppDispatch,
  useAppSelector
} from "../services/hooks";
import ProfileMenu from "../components/ProfileMenu/ProfileMenu";

export const ProfilePage: FC = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector(
      state => state.auth
  );

  const [form, setValue] = useState({ name:name, email:email, password: '' });
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
  const cancel = (e:SyntheticEvent) => {
    e.preventDefault();
    setValue({ name:name, email:email, password: '' });
  }
  const save = (e:SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateAuth(form));
  }
  useEffect(
      () => {
        dispatch(getAuth());
      },
      [dispatch]
  );

  useEffect(
      () => {
        setValue({ name:name, email:email, password: '' });
      },
      [name, email]
  );


  return (
      <div>
        <main>
          <div className={styles.conteiner + ' pt-20'}>
            <section className={styles.menu + ' mr-15'}>
              <ProfileMenu />
              <p className={styles.text + ' text text_type_main-default text_color_inactive mt-20'}>В этом разделе вы можете изменить свои персональные данные</p>
            </section>
            <section className={styles.about}>
              <form onSubmit={save} >
                <div className="mt-6"><Input type={'text'} placeholder={'Имя'} onChange={onChange} icon={'CurrencyIcon'} value={form.name} name="name" error={false} ref={inputRef} onIconClick={onIconClick} errorText={'Ошибка'} size={'default'} /></div>
                <div className="mt-6"><EmailInput onChange={onChange} value={form.email} name="email" /></div>
                <div className="mt-6"><PasswordInput onChange={onChange} value={form.password} name={'password'} /></div>
                <div className={styles.buttons + ' mt-6'}>
                  <button className={styles.cancel + ' text text_type_main-default pl-2 pr-2 mr-5'} onClick={cancel}>
                    Отмена
                  </button>
                  <Button type="primary" size="medium" name='Сохранить'>Сохранить</Button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
  );
}