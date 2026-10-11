import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Simulação de login: aguarda 800ms e "autentica" qualquer credencial já validada.
export const login = createAsyncThunk('auth/login', async ({ email }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const name = email.split('@')[0];
  return { email, name };
});

const initialState = {
  user: null,
  status: 'idle', // idle | loading | succeeded | failed
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
