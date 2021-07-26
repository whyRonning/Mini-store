import {Switch, Route} from "react-router-dom"
import './App.css';
import React, {useEffect} from "react";
import CartContainer from "./components/cart/cartContainer";
import ShopContainer from "./components/shop/shopContainer";
import {HeaderContainer} from "./components/header/headerContainer";
type props={
    getItems:()=>void
}
 export let App = (props:props) => {
     useEffect(()=>{
         props.getItems()
/*setInterval(()=>{
             props.getItems()
         },2000)*/
     })

    return (
        <>
            <HeaderContainer/>
            <Switch>
                <Route exact path="/"><ShopContainer/></Route>
                <Route exact path="/cart"><CartContainer/></Route>
                <Route><ShopContainer/></Route>
            </Switch>

        </>
    )
}

