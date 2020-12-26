import queryString from 'query-string';

export const createSlot = (slot) => {
    return fetch(`http://localhost:8009/api/slot/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(slot)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error));
}



export const getSlots = () => {
    return fetch(`http://localhost:8009/api/slots`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const list = (params) => {
    const query = queryString.stringify(params)
    console.log(query);
    return fetch(`http://localhost:8009/api/slots/search?${query}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}
