import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

let token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTMzNDg0MGQzNTQxNThjNWRkYzBjZWFkNmU4NGRiOTEwMTQzYmYxMTU5NzM3N2QxN2VlNTNiMTEzMTQ0ODc1OWQzM2I5MDMzZDdiZjIzMjgiLCJpYXQiOjE2NzM4NTczOTkuMDE3OTM3LCJuYmYiOjE2NzM4NTczOTkuMDE3OTM5LCJleHAiOjE3MDUzOTMzOTguOTc4Miwic3ViIjoiMTMiLCJzY29wZXMiOltdfQ.dx7qAOOC4sdgkD2YqIIyoZ7VR9yxAMNEtZBv7qERYcmTwGLuFkK1EuRLgN-dKzNx0bD-EdSNQc3v7VVZmY4uAQMUbg8nBVB5i9hk3WrtcfSzyoK5PeWHJtS_-KZqsziH2yjZATmJXk8El8N5I5FU2G_ZPnlN6ITQES6Lk1Pr-hNpO0Hz-0cNL-vaOCfExxJchU5q8L2MPjSsJhSIe68_BikOUx_bw9xc771paourl60xhNMs3-2H9EjOt1_X_GcpJO40aBCKoBbrHSUc2Roh0Hw54ZIycihs6vKf9xGdEu_e8PtgZ106y7eeaPHInEbmoNemVN8EbGEEru_8yn6dyIlXPHpQ2zeGEYhXuXj8vU4KlsAlgz0yeLFYPDkXIGewli0uUtOSTeplkWlDPFbIORPgqHcReHRAEgn0eqGzGNS_ozIxvs8J44GuYY3GpdNuEe7F0RYhAxr4aO_Ajmh66z53SKoN6CBwtaWI2F42Dfq_jD2OzQZuoTzo6uzP-QZGrM6mucTCx2aZFuk0YtA_wesN0nRDu4MCTL8Mf0NxTngEwxJQZsWdVydZoxwMQ1IQtO_MkhzTsTNIPOxfBJ5gHtaRmeRoGIriKT6TSzw752hRdZtBBRnBTN0u5ttVgwhjKzUT9tCQlGH62zVcXhA8WDcQTL-qTESaZ7bLvC6_xkU';

export const Userlist = createAsyncThunk('userlist/users', async () => {
  try {
    let url = 'user-managements';
    let body = {};
    let headersObj = {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const res = await axios.post(
      `http://192.168.1.34:8000/api/${url}`,
      (null, body, headersObj),
    );
    console.log(url, body, res, 'api response');
  } catch (err) {
    return err.response.data;
  }
});

const initialState = {
  users: [],
};

const usersListSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(Userlist.pending, (state, action) => {
      console.log(action.payload, 'reject');
    });

    builder.addCase(Userlist.fulfilled, (state, action) => {
      console.log('fulfilledxyz', state, action);
      state.users = action.payload;
    });

    builder.addCase(Userlist.rejected, (state, action) => {
      console.log(action.payload, 'reject');
    });
  },
});

export const {userToken} = usersListSlice.actions;
export default usersListSlice.reducer;
