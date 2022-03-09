import React from 'react'

export const GetOrderNumber = (orderData) => {
  return fetch(`https://norma.nomoreparties.space/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  }).then(checkResponse);
};