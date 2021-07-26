import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {countHandlerType} from "./cartContainer";
import styled from "styled-components";
type Props = { item: { id: number, name: string, cost: number, count: number,img:string }, globalCount: number, countHandler: countHandlerType, addItemAC: (id: number, count: number) => void, deleteItemAC: (id: number) => void }
let ItemBlock=styled.div`
        display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    align-items:center;
`
let StyledFAI=styled(FontAwesomeIcon)`
    color:blue;
    
    user-select:none;
    font-size:2vmin;
    
    `;
let ItemImg=styled.img`
    width:7vw;
    height:7vw;
`
let P=styled.p`
    margin:0 1vw 0 1vw;
    display:inline-block;
`
export let CartItem = (props: Props): JSX.Element => {
    return (
        <ItemBlock>
            <ItemImg src={props.item.img} alt=""/>
            <p>{props.item.name}</p>
            <div><StyledFAI onClick={() => {
                props.countHandler("left", props.item.id, props.addItemAC, props.deleteItemAC,props.globalCount,props.item.count)
            }} icon={"chevron-left"}/>
                <P>{props.item.count}</P>
                <StyledFAI onClick={() => {
                    props.countHandler("right", props.item.id, props.addItemAC, props.deleteItemAC,props.globalCount,props.item.count)
                }} icon={"chevron-right"}/>
                </div>
            <p>{props.item.cost*props.item.count} ₽</p>
        </ItemBlock>
    )
}