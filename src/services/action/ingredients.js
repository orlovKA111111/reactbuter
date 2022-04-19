import React from "react";
import { getAPIIngredients } from "../../utlls/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_INGREDIENTS_OBJECT = 'GET_INGREDIENTS_FAILED';
export const RESET_INGREDIENTS_OBJECT = 'GET_INGREDIENTS_FAILED';

export function getIngredients(ingredients) {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getAPIIngredients(ingredients)
            .then((res) => {
                if (res && res.success){
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: res.data
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    });
                }
            })
            .catch(() =>
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
            );
    };
}