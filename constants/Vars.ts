import { DARKGREY, GREEN, MAINCOLOR, RED } from "./Colors";

export const BASE_URL="https://commo-store.com/api/"
// export const BASE_URL="http://localhost:3000/api/"

export const deliveryOptions =  [{id:1, label:"Pickup"},{id:2, label:"Delivery"}, {id:3, label:"Delivery & Pickup"}]
export const customerDeliveryOptions = [
    {id:1, label:"Pickup"},
    {id:2, label:"Delivery"},
]


export const getStatus = (status ) => {
    switch(status){
        case 0:return{title:"Active", color:GREEN};
        case 1:return{title:"Processing", color:MAINCOLOR};
        case 2:return{title:"Finished", color:DARKGREY};
        case 3:return{title:"Canceled", color:RED};
        default:return{title:"Active", color:GREEN};
    }
}