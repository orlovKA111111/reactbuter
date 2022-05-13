import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './PageIngredient.module.css';

Ingredient.propTypes = {
    product: PropTypes.string.isRequired
};
export default function Ingredient ({ product }) {

    const { items } = useSelector(
        state => state.ingredients
    );
    const ingredient = (items.length > 0) ? items.find(i => i._id === product) : {image_large:'',name:'',calories:'',proteins:'',fat:'',carbohydrates:''};

    return (
        <div className={styles.wrap + ' pt-10 pb-15 pl-10 pr-10'}>
            <p className={styles.header + ' text text_type_main-large'}>Детали ингредиента</p>
            <img src={ingredient.image_large} alt="{ingredient.name}" />
            <p className={styles.name + ' text text_type_main-medium mt-4'}>{ingredient.name}</p>
            <div className={styles.structure + ' mt-8'}>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Калории,ккал</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{ingredient.calories}</p>
                </div>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Белки, г</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{ingredient.proteins}</p>
                </div>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Жиры, г</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{ingredient.fat}</p>
                </div>
                <div className={styles.component}>
                    <p className={styles.component_name + ' text text_type_main-default'}>Углеводы, г</p>
                    <p className={styles.component_value + ' text text_type_digits-default mt-2'}>{ingredient.carbohydrates}</p>
                </div>
            </div>

        </div>
    );
};



