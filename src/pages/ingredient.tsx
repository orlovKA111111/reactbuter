import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Ingredient from '../components/PageIngredient/';

import { getIngredients } from '../services/action/ingredients';


export const IngredientPage: React.FC = () =>  {

  const dispatch = useDispatch();
  const { id } = useParams<{id:string}>();

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