import {connect} from "react-redux";
import {Header} from "./header";
import {storeType} from "../../store/store";
import {ACreators} from "../../store/cartReducer";
let MSTP=(state:storeType)=>({
    items:state.cartReducer.items
})
export let HeaderContainer=connect(MSTP,{refreshItems:ACreators.refreshItems})(Header);