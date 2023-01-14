import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  token: null,
};

const authTokenSlice = createSlice({
  name: 'authtoken',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      console.log(action.payload, 'iiiiiiiiiiiiiiiiiii');
      state.email = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    setSignOut: state => {
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setSignIn, setSignOut} = authTokenSlice.actions;

export default authTokenSlice.reducer;
