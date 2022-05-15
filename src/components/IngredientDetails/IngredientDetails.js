import React from 'react';
import style from './IngredientDetails.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';


export default function IngredientDetails(){

    const { id } = useParams();
    const { items } = useSelector(
        state => state.ingredients
    );

    const ingredient = (items.length > 0) ? items.find(i => i._id === id) : {image_large:'',name:'',calories:'',proteins:'',fat:'',carbohydrates:''};

    return (
            <div className={style.popup}>
                <h2 className={style.popupHeader}>Детали иградиента</h2>
                <img src={ingredient.image_large} alt = 'img'/>
                <span className={style.popupNameItem}>{ingredient.name}</span>

                <div className={style.popupItem} >
                        <span>
                                Калории,ккал
                            <br/>
                            {ingredient.calories}
                        </span>
                    <span>
                                Белки, г
                            <br/>
                        {ingredient.proteins}
                        </span>
                    <span>
                                Жиры, г
                            <br/>
                        {ingredient.fat}
                        </span>
                    <span>
                                Углеводы г
                            <br/>
                        {ingredient.carbohydrates}
                        </span>
                </div>
            </div>
    )
}