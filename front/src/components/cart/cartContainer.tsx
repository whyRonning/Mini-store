import {connect, ConnectedProps} from "react-redux";
import {Cart} from "./cart";
import {storeType} from "../../store/store";
import {ACreators, itemArrayType} from "../../store/cartReducer";
import React from "react";
import {CartItem} from "./cartItem";
import styled from "styled-components";
export type countHandlerType=(name:string,id:number,addItem:(id:number,count:number)=>void,deleteItem:(id:number)=>void,globalCount:number,count:number)=>void;
let MSTP=(state:storeType)=>({
    addedItems:state.cartReducer.addedItems,
    items:state.cartReducer.items
});
let CartBlock=styled.div<{count:number}>`
    min-height:92vh;
    height:100%;
   
    background-color:whitesmoke;
`

let CartHOC=(props:connectorType)=>{

    let countHandler:countHandlerType=(name,id,addItem,deleteItem,globalCount,count)=>{
        if(name==="left"){
            deleteItem(id)
        }else{
            if(count<globalCount)
            addItem(id,1)
        }
    };
    let items=props.addedItems.map((e:itemArrayType,i:number)=>{
        return <CartItem deleteItemAC={props.deleteItemAC} addItemAC={props.addItemAC} countHandler={countHandler} globalCount={props.items.filter((element:itemArrayType)=>{
            return element.id===e.id
        })[0].count} item={e} key={e._id} />
    });
    return(
        <CartBlock count={props.addedItems.length} ><Cart buyAC={props.buyAC} dataOfItems={props.addedItems} items={items}/></CartBlock>
    )
};
let CartContainer=connect(MSTP,{addItemAC:ACreators.addItem,deleteItemAC:ACreators.deleteItem,buyAC:ACreators.buy});
type connectorType=ConnectedProps<typeof CartContainer>
export default CartContainer(CartHOC)
