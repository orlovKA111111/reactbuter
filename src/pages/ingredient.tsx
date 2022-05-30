import React from 'react';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../services/action/ingredients';
import { useAppDispatch } from "../services/hooks";
import Ingredient from '../components/PageIngredient/';


export const IngredientPage: React.FC = () =>  {

  const dispatch = useAppDispatch();
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