import React, {useContext} from 'react'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './OrderDetails.module.css'
import {APIOrder, BaseUrl} from "../../server/context/contextAPI";
import PropTypes from "prop-types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

BurgerConstructor.propTypes ={
    arrKeyt: PropTypes.object,
    url: PropTypes.string
}

export default function OrderDetails(){
    const arrKeyt = React.useContext(APIOrder)
    const url = React.useContext(BaseUrl)

    const [orders, setOrders] = React.useState({
        data: []
    });

    React.useEffect(() => {
        const getOrders = async () => {

            const res = await fetch(url + `orders`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "ingredients": arrKeyt
                })

            });
            if (!res.ok) {
                const mes = `Error: ${res.status}`;
                throw new Error(mes);
            }
            const data = await res.json();
            setOrders({...orders, data: data.order.number});

        };
        getOrders().catch(e => {
            alert(e);
        });
    },[url, arrKeyt])
    console.log(orders);


     return (
             <div className={style.orderBody}>
                 <p className="pl-2 pr-2 pb-2 pt-15 text text_type_digits-large">{orders.data}</p>
                 <p className="pl-2 pr-2 pb-10 pt-32 text text_type_main-default">индификатор заказа</p>
                 <div className={style.OrderCheck}>
                     <CheckMarkIcon type="primary" />
                 </div>
                 <p className="pl-2 pr-2 pb-1 pt-10 text text_type_main-default">Ваш заказа начали готовить</p>
                 <p className="pl-2 pr-2 pb-1 pt-1 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станцыии</p>
            </div>
     )
}


