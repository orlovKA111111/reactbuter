import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../services/hooks';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';
import FeedItem from '../components/Feed/FeedItem';
import styles from './profile.module.css';
import { TOrder } from '../services/types';
import {WS_CONNECTION_CLOSED_USER, WS_CONNECTION_START_USER} from "../services/action/wsActionsUser";


export const ProfileOrdersPage: React.FC = () => {
  const { orders } = useAppSelector(
      state => state.wsru.data
  );
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_USER });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_USER });
    };
  }, [dispatch]);

  return (
    <div>
      <main>
        <div className={styles.conteiner + ' pt-20'}>
          <section className={styles.menu + ' mr-15'}>
            <ProfileMenu />
            <p className={styles.text + ' text text_type_main-default text_color_inactive mt-20'}>В этом разделе вы можете просмотреть свою историю заказов</p>
          </section>
          <section className={styles.orders}>          
            {orders && orders.map((order : TOrder, index : number) => <FeedItem key={order._id} order={order} />)}
          </section>
        </div>
      </main>
    </div>
  );
}