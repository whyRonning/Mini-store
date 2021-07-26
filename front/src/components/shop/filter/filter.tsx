import React from "react";
import styled from "styled-components";
type props={
    name:string,
    notLess:string,
    notMore:string,
    inputHandler:(name:string,value:string)=>void
}
type withtype={
    with?:boolean;
}
let FilterH2=styled.h2`
    text-align:center;
`
let FilterBlock=styled.div`
    padding-left:1vw;
`
let Block=styled.div<withtype>`
    margin-bottom:2vh;
    user-select:none;
       display:grid;
       ${props=>props.with?"align-items:center;  grid-template-columns:70% 30%;":""};
   
`
let CheckBox=styled.input.attrs(props=>({
    type:"checkbox"
}))`
    width:1.2vw;
    height:1.2vw;
    
    
`
export let Filter=(props:props)=>{
    return(
        <FilterBlock>
            <FilterH2>Фильтры</FilterH2>
            <Block><label htmlFor="inputName">Название товара</label> <input type="text" id="inputName" onChange={(e)=>{props.inputHandler("name",e.target.value)}} value={props.name}/></Block>
            <h3>Цена</h3>
            <Block><label htmlFor="inputName">от </label> <input onChange={(e)=>{props.inputHandler("notLess",e.target.value)}} type="text" id="inputNotLess" value={props.notLess}/></Block>
            <Block><label htmlFor="inputName">до </label> <input onChange={(e)=>{props.inputHandler("notMore",e.target.value)}} type="text" id="inputNotMore" value={props.notMore}/></Block>
            <Block with ><label htmlFor="outStockVision">Показывать товары,которых нет в наличии</label> <CheckBox id="outStockVision" onChange={()=>{props.inputHandler("outStockVision","")}}/></Block>
        </FilterBlock>
    )
}