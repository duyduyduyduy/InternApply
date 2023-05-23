import { takeEvery, delay, put, takeLatest, call } from "redux-saga/effects";

function* getdata(action) {}
function* mySaga() {
  yield takeEvery("FETCH_DATA_FROM_API", getdata);
}
export default mySaga;
