import React from "react";

//const sumPrice = !arrItems?'':arrItems.map((i) => i.price).reduce((n,s)=> n+s );
export default  function (state, action){
    switch (action.type){
        case 'sumPrice':
            return  state
        default:
            return state
    }
}