import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  temp: {
    name: '',
    addr: '',
    hospital_name: '',
    date: '',
    amount: '',
    file: null
  },
  auth: {
    loggedIn: false,
    username: '',
    accessToken: '',
  }
};


export const counterSlice = createSlice({
  name: 'data',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    add: (state, action) => {
      state.value.push(action.payload);
    },
    set_temp: (state, action) => {
      state.temp = action.payload;
    },
    del_temp: (state) => {
      state.temp = initialState.temp;
    },
    login: (state,action) => {
      state.auth.loggedIn = true;
      state.auth.username = action.payload.username;
      state.auth.accessToken = action.payload.accessToken;
    },

    loginOut: (state) => {
      state.auth = initialState.auth;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

});


export const { add, set_temp, del_temp, login, loginOut } = counterSlice.actions;
export const selectData = (state) => state.user.value;
export const selectUser = (state) => state.user.auth;

export const selectTemp =  (state) => {
  return state.user.temp

};

export default counterSlice.reducer;
