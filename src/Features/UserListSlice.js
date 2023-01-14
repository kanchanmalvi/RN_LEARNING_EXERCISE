import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Api from '../API_Servies/Api';
import { useSelector } from 'react-redux';

export const userList = createAsyncThunk('users/useList', async () => {
  try {
    let url = 'user-managements';
    let body = {};
    console.log('body,url', body, url);
    const res = await Api.postData(url, body, null, 'userlist');
    console.log(res, 'api response');
    const list = res?.data?.payload;
    return list;
  } catch (error) {
    console.log(error, 'error user list');
  }
});

export const usersListSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },

  reducers: {},

  extraReducers: builder => {
    builder.addCase(userList.pending, (state, action) => {
      console.log('pending');
    });

    builder.addCase(userList.fulfilled, (state, action) => {
      console.log('fulfilledxyz', state, action);
      state.users = action.payload;
    });

    builder.addCase(userList.rejected, (state, action) => {
      console.log('reject');
    });
  },
});

export const {} = usersListSlice.actions;
export default usersListSlice.reducer;
