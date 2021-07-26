import {applyMiddleware, compose, combineReducers, createStore} from "redux";
import {cartReducer, rootSaga} from "./cartReducer";
import createSagaMiddleware from "redux-saga"
import {shopReducer} from "./shopReducer";

let mainReducer = combineReducers({shopReducer, cartReducer});
export type ActionTypes<A extends { [keys: string]: (...args: any) => { type: string, [keys: string]: any } }> = ReturnType<A extends { [keys: string]: infer U } ? U : never>
export type storeType = ReturnType<typeof mainReducer>
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
let saga=createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export let store=createStore(mainReducer,composeEnhancers(applyMiddleware(saga)));
saga.run(rootSaga);
