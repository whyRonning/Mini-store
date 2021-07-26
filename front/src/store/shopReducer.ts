import {ActionTypes} from "./store";

let data={
    filters:{notLess:"0",notMore:"20000",name:"",outOfStockVision:true}
    };
type actionTypes=ActionTypes<typeof ACreators>;
export let shopReducer=(state:typeof data=data ,action:actionTypes)=>{
    switch (action.type) {
        case "changeFilter": {
            if(action.name==="outStockVision"){
                return {...state,filters: {...state.filters,outOfStockVision:!state.filters.outOfStockVision}}
            }
            if(action.name==="notLess"||action.name==="notMore"){
                if(isNaN(Number(action.value))||Math.abs(Number(action.value))!==Number(action.value)){
                    return state
                }
                let value=action.value.split("");
                if(value[0]==="0"&&value[1]&&value[1]!=="."){
                    value.shift()
                }
                return {
                    ...state, filters: {...state.filters, [action.name]: value.join("")}
                }
            }
            return {
                ...state, filters: {...state.filters, [action.name]: action.value}
            }
        }
        default: {
            return state
        }
    }
};
export let ACreators={
    changeFilter:(name:string,value:string)=>({
        type:"changeFilter",
        name,value
    }) as const,
}