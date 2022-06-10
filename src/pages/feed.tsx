import React from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '../services/hooks';
import FeedItem from '../components/Feed/FeedItem';
import FeedInfo from '../components/Feed/FeedInfo';
import { TOrder } from '../services/types';
import styles from './home.module.css';
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../services/action/wsActions";


export const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(
    state => state.wsr.data
  );
  
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div>
      <main>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div className={styles.conteiner + ' mt-5'}>
          <section className={styles.item}>	
          	{orders && orders.map((order : TOrder, index : number) => <FeedItem key={order._id} order={order} />)}
          </section>
          <section className={styles.item}>
            <FeedInfo />
          </section>
        </div>
      </main>
    </div>
  )
};
