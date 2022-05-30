import React from 'react';
import styles from './PageIngredient.module.css';
import { IIngredient } from '../BurgerIngredients/types';
import { useAppSelector } from "../../services/hooks";

const Ingredient: React.FC<IIngredient> = ({ product }) =>  {

    const { items } = useAppSelector(
        state => state.ingredients
    );
    const ingredient = (items != null && items.length > 0) ? items.find(i => i._id === product) : {image_large:'',name:'',calories:0,proteins:0,fat:0,carbohydrates:0};

    const image_large = (ingredient && ingredient.image_large) ? ingredient.image_large : '';
    const name = (ingredient && ingredient.name) ? ingredient.name : '';
    const calories = (ingredient && ingredient.calories) ? ingredient.calories : 0;
    const proteins = (ingredient && ingredient.proteins) ? ingredient.proteins : 0;
    const fat = (ingredient && ingredient.fat) ? ingredient.fat : 0;
    const carbohydrates = (ingredient && ingredient.carbohydrates) ? ingredient.carbohydrates : '';

    return (
        <div className={styles.wrap + ' pt-10 pb-15 pl-10 pr-10'}>
            <p className={styles.header + ' text text_type_main-large'}>Детали ингредиента</p>
            <img src={image_large} alt="{ingredient.name}" />
            <p className={styles.name + ' text text_type_main-medium mt-4'}>{name}</p>
            <div className={styles.structure + ' mt-8'}>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Калории,ккал</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{calories}</p>
                </div>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Белки, г</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{proteins}</p>
                </div>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Жиры, г</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{fat}</p>
                </div>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Углеводы, г</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{carbohydrates}</p>
                </div>
            </div>

        </div>
    );
};
export default Ingredient;



