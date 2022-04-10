import React from 'react'
import style from './IngredientDetails.module.css'
import PropTypes from 'prop-types'
import {APIIngredients} from "../../server/context/contextAPI";

IngredientDetails.propTypes ={
    nextSelectedProduct: PropTypes.object
}

export default function IngredientDetails(){
    const nextSelectedProduct = React.useContext(APIIngredients)
    return (
            <div className={style.popup}>
                <h2 className={style.popupHeader}>Детали иградиента</h2>
                <img className={style.popupImgItem} src={nextSelectedProduct.image} />
                <span className={style.popupNameItem}>{nextSelectedProduct.name}</span>

                <div className={style.popupItem} >
                        <span>
                                Калории,ккал
                            <br/>
                            {nextSelectedProduct.calories}
                        </span>
                    <span>
                                Белки, г
                            <br/>
                        {nextSelectedProduct.proteins}
                        </span>
                    <span>
                                Жиры, г
                            <br/>
                        {nextSelectedProduct.fat}
                        </span>
                    <span>
                                Углеводы г
                            <br/>
                        {nextSelectedProduct.carbohydrates}
                        </span>
                </div>
            </div>
    )
}