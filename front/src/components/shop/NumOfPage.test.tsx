import { NumOfPage } from "./NumOfPage"
import {shallow} from "enzyme";
import React from "react";
import createSagaMiddleware from "redux-saga";
import configureMockStore from "redux-mock-store"
const middlewares = [createSagaMiddleware()];
const mockStore = configureMockStore(middlewares)
describe("test numOfPage", () => {
    let mock=jest.fn()
    it("correct render", () => {
        let component=shallow(<NumOfPage page={1} changePage={mock} />);
        expect(component).toMatchSnapshot()
    })
    it("",()=>{
        let component=shallow(<NumOfPage page={1} changePage={mock} />);
    })

})