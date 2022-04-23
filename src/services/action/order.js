import React from "react";
import { getAPIOrderNumber } from "../../utlls/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const RESET_ORDER_OBJECT = 'RESET_ORDER_OBJECT';

export function getOrder(ingredients) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getAPIOrderNumber(ingredients)
            .then((res) => {
                if (res && res.success){
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        order: {name:res.name, number:res.order.number}
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: GET_ORDER_FAILED
                })
            );
    };
}