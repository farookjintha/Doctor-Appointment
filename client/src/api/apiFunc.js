import {API} from '../config';


export const createSlot = (slot) => {
    return fetch(`${API}/slot/create`, {
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
    return fetch(`${API}/slots`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}
