import React, { FC } from 'react';
import { useAppSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { getOrderDate } from '../../utlls/date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from '../../services/types';
import styles from './FeedDetails.module.css';

type TFeedDetails = {
  isProfile:boolean;
};

const FeedDetails: FC<TFeedDetails> = ({ isProfile }:any) => {
  const { id } = useParams<{id:string}>();
  const { orders } = useAppSelector(
    state => (isProfile) ? state.wsru.data : state.wsr.data
  );
  const { items } = useAppSelector(
    state => state.ingredients
  )
  let order = (orders.length > 0) && orders.find((item:TOrder) => item.number == id);
  const date = (order) ? getOrderDate(order) : null;
  const status : {name:string, style:string} = (order && (order.status === 'done')) ? {name:'Выполнен', style:'done'}
   : (order && (order.status === 'pending')) ? {name:'Создан', style:'pending'}
   : (order && (order.status === 'created')) ? {name:'Готовится', style:'created'}
   : { name: 'Отменён', style:'cancel' };
  const orderNotDuble = order && order.ingredients.map((order) => order)
  let counts:any = [];

  const filtercahge = orderNotDuble && orderNotDuble.filter((i:string,id:number)=> orderNotDuble.indexOf(i) === id)

  orderNotDuble && orderNotDuble.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

let sum = 0;

let sumer =  orderNotDuble && orderNotDuble.map((item:any)=>  {
  (items != null) && items.map((i: any) => i === item.id)
})
  console.log(sumer, 'orderCountItems');

  return (
    <>
    {order && (
    <div className={styles.container}>
      <p className={styles.center + " text text_type_digits-default mt-6"}>#{id}</p>
      <p className="text text_type_main-medium mt-10">{order.name}</p>
      <p className={`text text_type_main-default mt-10 ${status.style}`}>{status.name}</p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={styles.list}>
        { filtercahge && filtercahge.map((id : string, index : number) => {

            let ingredient = (items != null) && items.find((product) => product._id === id);

            if (ingredient) {
              const price = ingredient.price;
              const image = ingredient.image_large;
              const name = ingredient.name;
              sum += counts[ingredient._id]*price
              return (
                  <li className={styles.list_item + ' mb-4'} key={index}>
                    <div className={styles.about}>
                      <div className={styles.img_item} style={{zIndex: 6}}>
                        <img src={image} alt={name}/>
                      </div>
                      <p className="text text_type_main-default ml-4">{name}</p>
                    </div>
                    <div className={styles.price}>
                      <span className="text text_type_digits-default mr-2">{counts[ingredient._id]} x {counts[ingredient._id]>1? counts[ingredient._id]*price:price}</span>
                      <CurrencyIcon type='primary'/>
                    </div>
                  </li>
              );
            }
        })}
      </ul>
      <div className={styles.footer + ' mt-10'}>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
        <p className={styles.price}>
          <span className="text text_type_digits-default mr-2">{sum}</span>
          <CurrencyIcon type='primary' />
        </p>
      </div>
    </div>
    )}
    </>
  );
};

export default FeedDetails;