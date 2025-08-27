import { combineReducers } from '@reduxjs/toolkit';
import user from '../Slice/User/user';

export default function createReducer() {
  const rootReducer = combineReducers({
    user,
  });

  return rootReducer;
}
