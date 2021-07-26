import {connect} from "react-redux";
import {ACreators} from "./store/cartReducer";
import {App} from "./App";

export let AppContainer=connect(null,{getItems:ACreators.getItems})(App)