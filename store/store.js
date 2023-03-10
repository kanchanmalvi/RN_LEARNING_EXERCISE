import {configureStore} from '@reduxjs/toolkit';
import authTokenReducer from '../src/Features/authTokenSlice';
import usersListReducer from '../src/Features/UserListSlice';
import tokenReducer from '../src/Features/loginTokenSlice'
import StoreSlice from '../src/StoreSlice';

export const store = configureStore({
  reducer: {
    counter: StoreSlice,
    authToken: authTokenReducer,
    users: usersListReducer,
    copytoken:tokenReducer
  },
});
