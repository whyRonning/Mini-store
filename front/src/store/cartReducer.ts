import {ActionTypes, storeType} from "./store";
import {takeEvery, call,select, put} from 'redux-saga/effects'
import axios from "axios";
export type itemArrayType = { _id: string, id: number, name: string, cost: number, count: number,img:string }
type dataType = typeof data
let data = {
    addedItems: [] as Array<itemArrayType>,
    items: [] as Array<itemArrayType>,
    page:1

};
type ACTypes = ActionTypes<typeof ACreators>
export let cartReducer = (state: dataType = data, action: ACTypes) => {
    switch (action.type) {
        case "deleteItem" : {
            let item: Array<itemArrayType> = state.addedItems.filter((e) => {
                return e.id === action.id
            });
            return item[0].count > 1 ? {
                ...state, addedItems: state.addedItems.map((e) => {
                    return e.id === action.id ? {...e, count: e.count - 1} : e
                })
            } : {
                ...state, addedItems: state.addedItems.filter((e) => {
                    return e.id !== action.id
                })
            }
        }
        case "clearItems":{
            return {...state,addedItems: []}
        }
        case "refreshItems": {
            return {...state, items: action.data}
        }
        case "addItem": {
            let findItem = state.addedItems.filter((e) => {
                return e.id === action.id
            })[0];
            let item = {
                ...state.items.filter((e) => {
                    return e.id === action.id
                }).map((e) => {
                    if (e.id === action.id) {
                        return {...e, count: action.count}
                    }
                    return e
                })
            };

            return !findItem ?
                {...state, addedItems: [...state.addedItems, item[0]]}
                :
                {
                    ...state, addedItems: state.addedItems.map((e) => {
                        return e.id === action.id ? {...e, count: e.count + action.count} : e
                    })
                }

        }
        case "changePage":{
            return {...state,page: action.page}
        }
        default: {
            return state
        }
    }
};
export let ACreators = {
    deleteItem: (id: number) => ({
        type: "deleteItem",
        id
    }) as const,
    refreshItems: (data: Array<itemArrayType>) => ({
        type: "refreshItems",
        data
    }) as const,
    addItem: (id: number, count: number) => ({
        type: "addItem",
        id, count

    }) as const,
    getItems:()=>({
        type:"getItems"
    })as const,
    buy:(data:Array<itemArrayType>)=>({
        type:"buy",
        data
    })as const,
    clearItems:()=>({
        type:"clearItems"
    })as const,
    changePage:(page:number)=>({
        type:"changePage",
        page
    })as const
};

function* complianceCheck(resp:{type:"string",data:Array<itemArrayType>}) {

    let items:Array<itemArrayType>=yield select((state:storeType)=>{return state.cartReducer.items});
    let check:(item?:number,circle?:number)=>boolean=(item=0,circle=0)=> {
        if (resp.data.length=== item) {
            return false
        }
        if (circle === items.length) {
            return true
        }

        if (resp.data[item]._id === items[circle]._id) {
            if (resp.data[item].count === items[circle].count && resp.data[item].cost === items[circle].cost) {
                return check(0, circle + 1)
            }
        }
        return check(item+1,circle)
    };

    if(resp.data.length!==items.length||!check()){
        yield put({type:"refreshItems",data:resp.data});
        console.log("da")
    }

}
function *getItems() {
    const data:Array<itemArrayType>=yield call(request,"GET","cartItems");
    yield put({type:"complianceCheck",data})
}
function *buy(data:{type:"string",data:Array<itemArrayType>}){
    yield call(request,"POST","/buy",data.data);
    yield put({type:"clearItems"})
}
let request=async (method:string="GET",url:string="/",body:any={})=>{
    try {

        if (method==="GET"){
            let data=await axios.get("/api/"+url);
            return data.data.message
        }else if (method==="POST"){
            let data=await axios.post("/api/"+url,body);
            return data.data.message
        }else{
            let data=await axios.delete("/api/"+url);
            return data.data.message
        }
    }catch (e) {
        console.log(e)
    }
};
export function* rootSaga() {
    yield takeEvery('complianceCheck', complianceCheck);
    yield takeEvery('getItems', getItems);
    yield takeEvery('buy',buy)
}
