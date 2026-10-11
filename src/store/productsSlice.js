import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getErrorMessage,
  getProductById,
  getProductsByCategory,
} from '../services/api';
import { logout } from './authSlice';

export const fetchCategory = createAsyncThunk(
  'products/fetchCategory',
  async (category, { rejectWithValue }) => {
    try {
      const products = await getProductsByCategory(category);
      return { category, products };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
  {
    // Evita requisições repetidas: não busca se já carregou ou está carregando.
    condition: (category, { getState }) => {
      const status = getState().products.byCategory[category]?.status;
      return status !== 'loading' && status !== 'succeeded';
    },
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  // { [categoria]: { items: [], status, error } }
  byCategory: {},
  details: { item: null, status: 'idle', error: null },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Permite ao usuário tentar novamente após um erro.
    resetCategory: (state, action) => {
      delete state.byCategory[action.payload];
    },
    clearDetails: (state) => {
      state.details = initialState.details;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.byCategory[action.meta.arg] = {
          items: [],
          status: 'loading',
          error: null,
        };
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.byCategory[action.payload.category] = {
          items: action.payload.products,
          status: 'succeeded',
          error: null,
        };
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.byCategory[action.meta.arg] = {
          items: [],
          status: 'failed',
          error: action.payload || 'Erro ao carregar produtos.',
        };
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.details = { item: null, status: 'loading', error: null };
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.details = { item: action.payload, status: 'succeeded', error: null };
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.details = {
          item: null,
          status: 'failed',
          error: action.payload || 'Erro ao carregar o produto.',
        };
      })
      // Logout limpa também os dados de produtos.
      .addCase(logout, () => initialState);
  },
});

export const { resetCategory, clearDetails } = productsSlice.actions;
export default productsSlice.reducer;
