// import { createAction, handleActions } from 'redux-actions';
// import { takeLatest } from 'redux-saga/effects';
// import * as authAPI from '../lib/api/auth';
// import createRequestSaga, {
//   createRequestActionTypes,
// } from '../lib/createRequestSaga';

// const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// // 회원 정보 확인
// const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
//   'user/CHECK',
// );

// export const tempSetUser = createAction(TEMP_SET_USER, user => user);
// export const check = createAction(CHECK);

// const checkSaga = createRequestSaga(CHECK, authAPI.check);

// function checkFailureSaga() {
//   try {
//     localStorage.removeItem('user'); // localStorage에서 user를 제거
//   } catch (e) {
//     console.log('localStorage is not working');
//   }
// }

// export function* userSaga() {
//   yield takeLatest(CHECK, checkSaga);
//   yield takeLatest(CHECK_FAILURE, checkFailureSaga);
// }

// const initialState = {
//   user: null,
//   checkError: null,
// };

// export default handleActions(
//   (...),
//   initialState,
// );