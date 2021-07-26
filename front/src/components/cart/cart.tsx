import React, {ReactElement} from "react";
import {itemArrayType} from "../../store/cartReducer";
import styled from "styled-components";

type CartType = { items: Array<ReactElement>, buyAC: (data: Array<itemArrayType>) => void, dataOfItems: Array<itemArrayType> }
let CartBlock=styled.div`
    margin-left:10%;
    margin-right:2%;
    display:grid;
    grid-template-columns:4fr 2fr;
    grid-gap:1vw;
`
let H2=styled.h2`
margin:0;
    padding: 5vh 10%; 
`
let ItemsBlock=styled.div`
    background-color:white;
`
let PayBlock=styled.div`
    background-color:white;
    width:25vw;
    display:grid;
    grid-template-columns:4fr 1fr;
    padding:2vh 1vw 2vh 1vw;
`
let NoneItems=styled.p`
    margin:0;
`
let Row=styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
`
let FirstRow=styled.p`
    grid-column-start: 2;
`
let PayButt=styled.button`
    grid-column:1/3;
    justify-self:center;
    width:25vw;
    margin-top:2vh;
`
let P=styled.p`
    border-bottom:1px solid black;
    padding-bottom:4vh;
`
export let Cart = (props: CartType) => {
    return (
        <div>
        {props.items[0]?<><H2>Корзина</H2><CartBlock>

            <ItemsBlock>
                <Row><FirstRow>Название</FirstRow><p>Количество</p><p>Цена</p></Row>
                {props.items}
            </ItemsBlock>
            <PayBlock>
                <P>Итого:</P><P>{props.dataOfItems.reduce((sum, e) => {
                return sum + e.cost * e.count
            }, 0)} ₽</P>
                <PayButt onClick={() => {
                    props.buyAC(props.dataOfItems)
                }}>Оплатить
                </PayButt>
            </PayBlock>
            </CartBlock></>:<NoneItems>Корзина пуста</NoneItems>}
        </div>
    )

}