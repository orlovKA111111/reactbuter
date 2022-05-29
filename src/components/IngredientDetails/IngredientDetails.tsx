import React from 'react';
import style from './IngredientDetails.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import {
    IStateI,
    IIngredients
} from '../BurgerIngredients/types';

const IngredientDetails: React.FC = () =>{

    const { id } = useParams<{id:string}>();
    const { items } = useSelector< IStateI, { items: Array<IIngredients> | null }>(
        state => state.ingredients
    );

    const ingredient = (items != null && items.length > 0) ? items.find(i => i._id === id) : {image_large:'',name:'',calories:0,proteins:0,fat:0,carbohydrates:0};

    const image_large = (ingredient && ingredient.image_large) ? ingredient.image_large : '';
    const name = (ingredient && ingredient.name) ? ingredient.name : '';
    const calories = (ingredient && ingredient.calories) ? ingredient.calories : 0;
    const proteins = (ingredient && ingredient.proteins) ? ingredient.proteins : 0;
    const fat = (ingredient && ingredient.fat) ? ingredient.fat : 0;
    const carbohydrates = (ingredient && ingredient.carbohydrates) ? ingredient.carbohydrates : '';
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
export default IngredientDetails;