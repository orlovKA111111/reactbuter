import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Ingredient from '../components/PageIngredient/index';

import { getIngredients } from '../services/action/ingredients';


export const IngredientPage = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );
  
  return (
    <div>
      <Ingredient product={id} />
    </div>
  )
};