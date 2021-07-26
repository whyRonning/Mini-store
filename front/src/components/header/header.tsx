import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components"

let StyledHeader = styled.header`
    background-color:#b8463f;
    height:7vh;
    display:grid;
    grid-template-columns:15% 15% 55% 15%
`;
let Links = styled(Link)`
    justify-self:center;
    align-self:center;
    font-size:2.3vmin;
    text-decoration:none;
    ${(props) => {
    return props.to === "/cart" ? "grid-column:4/5;" : " "
}}
    color:white;
    &:before{
      position:absolute;
      content:"<";
      margin-left:-1vmin;
      font-size:3vmin;
      transition:margin-left .4s ease,opacity .2s ease;
      color:white;
      opacity:0;
      margin-top:-.33vh; 
    }
    &:after{
      transition:margin-left .4s ease,opacity .2s ease;
      margin-top:-.33vh; 
      position:absolute;
      opacity:0;
      content:">";
      margin-left:-1vmin;
      font-size:3vmin;
      color:white;
    }
    &:hover{
        &:before{
            margin-left:-2vmin;
            opacity:100;
        }
          &:after{
            opacity:100;
            margin-left:.3vmin;
        }
    }
`;

export let Header = (): JSX.Element => {
    return (
        <StyledHeader>
            <Links to={"/"}>Главная</Links>
            <Links to={"/cart"}><FontAwesomeIcon icon="shopping-cart" size={"lg"}/></Links>
        </StyledHeader>
    )
};