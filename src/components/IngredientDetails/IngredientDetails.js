import React from 'react'
import style from './IngredientDetails.module.css'

export default function IngredientDetails(props){
    return (
            <div>
                <h2 className={style.popupHeader}>Детали иградиента</h2>
                <img className={style.popupImgItem} src={props.Details.selectedItem.image} />
                <span className={style.popupNameItem}>{props.Details.selectedItem.name}</span>

                <div className={style.popupItem} >
                        <span>
                                Калории, ккал
                            <br/>
                            {props.Details.selectedItem.calories}
                        </span>
                    <span>
                                Белки, г
                            <br/>
                        {props.Details.selectedItem.proteins}
                        </span>
                    <span>
                                Жиры, г
                            <br/>
                        {props.Details.selectedItem.fat}
                        </span>
                    <span>
                                Углеводы г.
                            <br/>
                        {props.Details.selectedItem.carbohydrates}
                        </span>
                </div>
            </div>
    )
}