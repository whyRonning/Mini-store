import {connect, ConnectedProps} from "react-redux";
import {Filter} from "./filter";
import {storeType} from "../../../store/store";
import {FC} from "react";
import React from "react";
import {ACreators} from "../../../store/shopReducer";
let MSTP=(state:storeType)=>({
    filters:state.shopReducer.filters
});
let filterHOC:FC<filterContType>=(props):JSX.Element=>{
    let inputHandler=(name:string,value:string)=>{
        if(name==="outStockVision"){
            props.changeFilterAC(name, "")
        }else {
            props.changeFilterAC(name, value)
        }
    };
    return(
        <Filter name={props.filters.name} notLess={props.filters.notLess} notMore={props.filters.notMore} inputHandler={inputHandler}/>
    )
}
let FilterContainer=connect(MSTP,{changeFilterAC:ACreators.changeFilter});
type filterContType=ConnectedProps<typeof FilterContainer>
export default FilterContainer(filterHOC);