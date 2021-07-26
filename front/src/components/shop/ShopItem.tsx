import React, {Dispatch, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type Props = { e: { id: number, name: string, cost: number, count: number,img:string},countInCart:number,addToCart:(localCount: number, id: number,count:number,setCount:(count:number)=>void)=>void, addItemAC: (id: number, count: number) => void, countHandler: (name: string, count: number, localCount: number, setCount: Dispatch<number>) => void }

let StyledFAI=styled(FontAwesomeIcon)`
    color:blue;
    display:inline-block;
    user-select:none;
    font-size:2vmin;
    
    `;
let P=styled.p<{types?:boolean}>`
    display:inline-block;
    text-align:center;
    font-size:2vmin;
    ${props=>{
        return props.types?"width:2vw;":""
    }}
`;
let Item=styled.div`
  
    display: grid;
    
    &:nth-child(3n-1){
    border-left:1px solid black;
    border-right:1px solid black;
     border-bottom:1px solid black;
    }
    &:nth-child(3n-2){
    border-left:1px solid black;
     border-bottom:1px solid black;
    }
        &:nth-child(3n){
    border-right:1px solid black;
     border-bottom:1px solid black;
    }
`
let ShopButt=styled.button`
    display: block;
    justify-self:center;
     margin-bottom:2vh;
`
let Photo=styled.img`
    width:15vw;
    justify-self:center;
`
let H2=styled.h2`
    text-align:center;
`
let CountBlock=styled.div`
    justify-self:center;
`
export let ShopItem: React.FC<Props> = (props): JSX.Element => {
    let [count, setCount] = useState<number>(0);

    return (<Item>
        <Photo src={props.e.img} alt=""/>
        <H2>{props.e.name}</H2><P >Цена:{props.e.cost} Руб</P><P>В наличии:{props.e.count-props.countInCart===0?"Нет в наличии":props.e.count-props.countInCart}</P>
        <CountBlock>
        <StyledFAI onClick={() => {props.countHandler("left", props.e.count-props.countInCart, count, setCount)}} icon={"chevron-left"}/>
        <P types >{count}</P>
        <StyledFAI onClick={() => {props.countHandler("right", props.e.count-props.countInCart, count, setCount)}} icon={"chevron-right"}/>
        </CountBlock>
        <ShopButt disabled={count===0||props.e.count===0} onClick={() => {props.addToCart(count, props.e.id,props.e.count-props.countInCart,setCount)}}>Добавить в корзину
        </ShopButt>
    </Item>)
};