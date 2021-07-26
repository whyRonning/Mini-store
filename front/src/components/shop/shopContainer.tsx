import {connect, ConnectedProps} from "react-redux";
import {Shop} from "./shop";
import {ACreators, itemArrayType} from "../../store/cartReducer";
import {ShopItem} from "./ShopItem";
import React, {Dispatch} from "react";
import {storeType} from "../../store/store";
import { shopSelector } from "./filter/shopSelector";
import {NumOfPage} from "./NumOfPage";
import styled from "styled-components";
let MSTP=(state:storeType)=>({
    items:shopSelector(state),
    addedItems: state.cartReducer.addedItems,
    page:state.cartReducer.page
});
let NumsOfPageWrapper=styled.div`
    display:grid;
    width:65%;
    height:6vh;
    align-content:center;
    justify-content:center;
`
let ShopHOC=(props:connectorType)=>{
    let countHandler=(name:string,count:number,localCount:number,setCount:Dispatch<number>):void=>{
        setCount((localCount+1>count&&name==="right")||(localCount<1&&name==="left")?localCount:name==="left"?localCount-1:localCount+1)
    };
    let addToCart = (localCount: number, id: number,count:number,setCount:(count:number)=>void): void => {
        props.addItemAC(id, localCount)
        setCount(0)
    };
    let NumOfPages=new Array(Math.floor(props.items.length/6)+1||1).fill(1).map((e,i)=>{
        return <NumOfPage page={i+1} key={i} changePage={props.changePage} />
    });
    let items=()=>{
        if(props.items[0]){
            return props.items.filter((e,i)=>{return ((props.page-1)*6<=i)&&(props.page*6>i)}).map((e:itemArrayType,i:number)=>{
                return <ShopItem countInCart={props.addedItems.filter((item)=>{return e._id===item._id})[0]?props.addedItems.filter((item)=>{return e._id===item._id})[0].count:0} addToCart={addToCart} countHandler={countHandler} key={e._id} addItemAC={props.addItemAC} e={e}/>});
        }else {
            return <div>Нет товаров по данному запросу</div>
        }
    };

    return(
        <>
        <Shop items={items()} />
        <NumsOfPageWrapper>
            <p>Страницы: {NumOfPages}</p>
        </NumsOfPageWrapper>
        </>
    )
};
let ShopContainer=connect(MSTP,{addItemAC:ACreators.addItem,changePage:ACreators.changePage});

type connectorType=ConnectedProps<typeof ShopContainer>
export default ShopContainer(ShopHOC)