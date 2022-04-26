import React from 'react'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './OrderDetails.module.css'
import {useSelector}  from "react-redux";
import PropTypes from "prop-types";

OrderDetails.propTypes ={
    order: PropTypes.object,
}

export default function OrderDetails(){
    const { orderObject } = useSelector(
        state => state.order
    );
    return (
             <div className={style.orderBody}>
                 <p className="pl-2 pr-2 pb-2 pt-15 text text_type_digits-large">{orderObject.number}</p>
                 <p className="pl-2 pr-2 pb-10 pt-32 text text_type_main-default">индификатор заказа</p>
                 <div className={style.OrderCheck}>
                     <CheckMarkIcon type="primary" />
                 </div>
                 <p className="pl-2 pr-2 pb-1 pt-10 text text_type_main-default">Ваш заказа начали готовить</p>
                 <p className="pl-2 pr-2 pb-1 pt-1 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станцыии</p>
            </div>
     )
}


