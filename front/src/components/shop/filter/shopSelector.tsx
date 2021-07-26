import { createSelector } from "reselect";
import {storeType} from "../../../store/store";

let getItems=(state:storeType)=>{
    return state.cartReducer.items
}
let getAddedItems=(state:storeType)=>{
    return state.cartReducer.addedItems
}
let getFilters=(state:storeType)=>{
    return state.shopReducer.filters
}
export let shopSelector=createSelector(getItems,getFilters,getAddedItems,(items,filters,addedItems)=>{
    let filteredItems=items;
    if(filters.name!==""){
        filteredItems=filteredItems.filter((e)=>{
            return e.name.indexOf(filters.name)>-1
        })
    }
    filteredItems=filteredItems.filter((e)=>{
        return e.cost>=Number(filters.notLess)&&e.cost<=Number(filters.notMore)
    });
    if(!filters.outOfStockVision){
    filteredItems=filteredItems.filter(el=>{
        let count=addedItems.reduce((sum,e)=>{
            if(el._id===e._id){
                return sum+e.count
            }
            return sum
        },0);
        return el.count-count>0
    })}
    return filteredItems

});