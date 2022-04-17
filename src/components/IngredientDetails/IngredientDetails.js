import React from 'react'
import style from './IngredientDetails.module.css'
import PropTypes from 'prop-types'
import { useSelector } from  'react-redux'

IngredientDetails.propTypes ={
    ingredients: PropTypes.object
}

export default function IngredientDetails(){
    const { itemDetails } = useSelector(
        state => state.ingredients
    );

    const { image_large, name, calories, proteins, fat, carbohydrates } = itemDetails;
    return (
            <div className={style.popup}>
                <h2 className={style.popupHeader}>Детали иградиента</h2>
                <img className={style.popupImgItem} src={image_large} />
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