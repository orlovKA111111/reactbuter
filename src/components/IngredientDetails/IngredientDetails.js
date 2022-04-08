import React from 'react'
import style from './IngredientDetails.module.css'
import PropTypes from 'prop-types'
import {APIIngredients} from "../../server/context/contextAPI";

IngredientDetails.propTypes ={
    Ingredient: PropTypes.object.isRequired
}

export default function IngredientDetails(){
    const Ingredient = React.useContext(APIIngredients)
    return (
            <div className={style.popup}>
                <h2 className={style.popupHeader}>Детали иградиента</h2>
                <img className={style.popupImgItem} src={Ingredient.image} />
                <span className={style.popupNameItem}>{Ingredient.name}</span>

                <div className={style.popupItem} >
                        <span>
                                Калории,ккал
                            <br/>
                            {Ingredient.calories}
                        </span>
                    <span>
                                Белки, г
                            <br/>
                        {Ingredient.proteins}
                        </span>
                    <span>
                                Жиры, г
                            <br/>
                        {Ingredient.fat}
                        </span>
                    <span>
                                Углеводы г
                            <br/>
                        {Ingredient.carbohydrates}
                        </span>
                </div>
            </div>
    )
}