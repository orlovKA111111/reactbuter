export const url = "https://norma.nomoreparties.space/api/"

export const getAPIIngredients = async () => {
        const res = await fetch(url + "ingredients");
        if (!res.ok){
            const mes = `Error: ${res.status}`;
            throw new Error(mes);
        }
        const data = await res.json();
        return data
    }



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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        });
}