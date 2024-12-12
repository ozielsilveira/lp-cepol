import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';

interface EquipamentState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: EquipamentState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchEquipaments = createAsyncThunk('equipaments/fetch', async () => {
  const response = await apiClient.get('/equipaments');
  return response.data;
});

export const createEquipament = createAsyncThunk('equipaments/create', async (newArticle: any) => {
  const response = await apiClient.post('/equipaments', newArticle);
  return response.data;
});

const equipamentSlice = createSlice({
  name: 'equipaments',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipaments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEquipaments.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEquipaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar artigos';
      })
      .addCase(createEquipament.fulfilled, (state, action: PayloadAction<any>) => {
        state.data.push(action.payload);
      });
  },
});

export const { clearError } = equipamentSlice.actions;
export default equipamentSlice.reducer;