import  React from "react";
import styled from "styled-components";
let Numbers=styled.p`
    display:inline;
    cursor:pointer;
    padding:0 .5vw 0 .5vw;
    
`
type props={
    page:number,
    changePage:(page:number)=>void
}
export let NumOfPage=(props:props)=>{
    return (
        <Numbers onClick={()=>{props.changePage(props.page)}}>{props.page}</Numbers>
    )
}