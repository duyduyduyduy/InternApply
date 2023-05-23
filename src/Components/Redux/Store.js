import { combineReducers, createStore, applyMiddleware } from "redux";
import MiddleReSa from "./Saga/MiddleReSa";
import reduxSaga from "redux-saga";
import UserReducer from "./Reducer/UserReducer";
const middleware = reduxSaga();
const allReducer = combineReducers({
  UserStore: UserReducer,
});
export default createStore(allReducer, applyMiddleware(middleware));
//Run redux-saga luôn nằm dưới "applyMiddleWare"
middleware.run(MiddleReSa);
