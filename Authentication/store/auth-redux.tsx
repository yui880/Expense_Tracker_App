import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem('token', state.token);
    }, // 인증에 성공하면 트리거
    logout: state => {
      state.token = '';
      state.isAuthenticated = false;
      AsyncStorage.removeItem('token');
    }, // 인증 상태 지우기
  },
});

export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;

export default authSlice.reducer;
