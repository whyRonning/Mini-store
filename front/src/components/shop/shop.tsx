import React, {FC, ReactElement} from "react";
import styled from "styled-components";
import FilterContainer from "./filter/filterContainer"
type Props={items:Array<ReactElement>|JSX.Element}
let ShopWrapper=styled.div`
    display:grid;
    grid-template-columns:70% 30%;
`
let ShopWrapperItems=styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
`
export let Shop:FC<Props>=(props):ReactElement=>{
    return(
        <ShopWrapper>
            <ShopWrapperItems>{props.items}</ShopWrapperItems>
            <FilterContainer/>
        </ShopWrapper>
    )
}