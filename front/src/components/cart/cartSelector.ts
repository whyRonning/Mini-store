import {storeType} from "../../store/store";

let itemsReturner=(state:storeType)=>{
    return state.cartReducer.items
}