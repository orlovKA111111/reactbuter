import React from 'react';
import style from './IngredientDetails.module.css'
import { useSelector } from  'react-redux'

export default function IngredientDetails(){
    const { itemObject } = useSelector(
        state => state.ingredients
    );

    const { image_large, name, calories, proteins, fat, carbohydrates } = itemObject;
    return (
            <div className={style.popup}>
                <h2 className={style.popupHeader}>Детали иградиента</h2>
                <img src={image_large} alt = 'img'/>
                <span className={style.popupNameItem}>{name}</span>

                <div className={style.popupItem} >
                        <span>
                                Калории,ккал
                            <br/>
                            {calories}
                        </span>
                    <span>
                                Белки, г
                            <br/>
                        {proteins}
                        </span>
                    <span>
                                Жиры, г
                            <br/>
                        {fat}
                        </span>
                    <span>
                                Углеводы г
                            <br/>
                        {carbohydrates}
                        </span>
                </div>
            </div>
    )
}