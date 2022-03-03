import React from 'react'
import style from './IngredientDetails.module.css'
import PropTypes from 'prop-types'

IngredientDetails.propTypes ={
    selectedItem: PropTypes.object.isRequired
}

export default function IngredientDetails(props){
    return (
            <div className={style.popup}>
                <h2 className={style.popupHeader}>Детали иградиента</h2>
                <img className={style.popupImgItem} src={props.selectedItem.image} />
                <span className={style.popupNameItem}>{props.selectedItem.name}</span>

                <div className={style.popupItem} >
                        <span>
                                Калории,ккал
                            <br/>
                            {props.selectedItem.calories}
                        </span>
                    <span>
                                Белки, г
                            <br/>
                        {props.selectedItem.proteins}
                        </span>
                    <span>
                                Жиры, г
                            <br/>
                        {props.selectedItem.fat}
                        </span>
                    <span>
                                Углеводы г
                            <br/>
                        {props.selectedItem.carbohydrates}
                        </span>
                </div>
            </div>
    )
}