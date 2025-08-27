import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthReq } from '../../../utils/apiHandlers';
import Cookies from 'js-cookie';

export const fetchUserData = createAsyncThunk(
  'fetchUserData/fetchUserData',
  async () => {
    const response = await getAuthReq('/users/me');
    if (!response.status) {
      if (response?.error.message === 'Unauthorized') {
        Cookies.remove('accessToken');
      }
      throw new Error('Failed to fetch User');
    }
    return response?.data;
  },
);

const initialState = {
  userData: {},
  loading: true,
  token: '', // Add token state
  notification: {
    title: '',
    body: '',
    messageId: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userData = {};
      state.loading = false;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setNotifications(state, action) {
      const { title, body, messageId } = action.payload;
      state.notification = { title, body, messageId };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const { logout, setToken, setNotifications } = userSlice.actions;
export default userSlice.reducer;
