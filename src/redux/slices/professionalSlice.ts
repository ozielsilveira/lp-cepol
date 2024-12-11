import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';

interface professionalState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: professionalState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProfessional = createAsyncThunk('professional/fetch', async () => {
  const response = await apiClient.get('/professional');
  return response.data;
});

export const createProfessional = createAsyncThunk('professional/create', async (newArticle: any) => {
  const response = await apiClient.post('/professional', newArticle);
  return response.data;
});

const professionalSlice = createSlice({
  name: 'professional',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfessional.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfessional.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfessional.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar artigos';
      })
      .addCase(createProfessional.fulfilled, (state, action: PayloadAction<any>) => {
        state.data.push(action.payload);
      });
  },
});

export const { clearError } = professionalSlice.actions;
export default professionalSlice.reducer;