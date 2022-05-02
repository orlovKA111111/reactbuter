export const url = "https://norma.nomoreparties.space/api/"

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
};

export const getAPIIngredients = async () => {

       return fetch(url + "ingredients")
            .then(checkResponse);
     };

export const getAPIOrderNumber = async (ingredients) => {

    return fetch(url + 'orders', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredients,
        })
    })
        .then(checkResponse);
};