import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';

interface researchState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: researchState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchResearch = createAsyncThunk('research/fetch', async () => {
  const response = await apiClient.get('/research');
  return response.data;
});

export const createResearch = createAsyncThunk('research/create', async (newArticle: any) => {
  const response = await apiClient.post('/research', newArticle);
  return response.data;
});

const researchlSlice = createSlice({
  name: 'research',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResearch.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchResearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar artigos';
      })
      .addCase(createResearch.fulfilled, (state, action: PayloadAction<any>) => {
        state.data.push(action.payload);
      });
  },
});

export const { clearError } = researchlSlice.actions;
export default researchlSlice.reducer;