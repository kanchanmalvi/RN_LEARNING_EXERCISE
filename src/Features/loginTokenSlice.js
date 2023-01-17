import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/user',
  async ({email, password}, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await axios.post('http://192.168.1.15:8000/api/user-login', {
        email,
        password,
      });
      console.log(res, 'api response');
      if (res?.success) {
        return fulfillWithValue(res);
      }
    } catch (err) {
      return rejectWithValue(err.response, 'api error');
    }
  },
);

// export const getLoggedInUser = createAsyncThunk('loggedInUser', async () => {
//   try {
//     const {data} = await axios.get(`http://192.168.1.34:8000/api/${url}`, {
//       headers: {
//         'x-auth-token': AsyncStorage.getItem('token'),
//       },
//     });
//     if (data?.success) {
//       return data;
//     }
//   } catch (err) {
//     return err.response.data;
//   }
// });

const initialState = {
  isLoggedIn: false,
  email: null,
  token: null,
};

const tokenSlice = createSlice({
  name: 'copytoken',
  initialState,
  reducers: {
    setSignOut: state => {
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      console.log(action.payload, 'pending');
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log('fulfilledxyz', action.payload);
      state.email = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(action.payload, 'reject');
    });
  },
});

export const {} = tokenSlice.actions;

export default tokenSlice.reducer;
