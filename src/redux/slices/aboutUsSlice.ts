import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';// Instância do Axios

// Tipagem para o estado
interface AboutUsState {
  data: any[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: AboutUsState = {
  data: [],
  loading: false,
  error: null,
};


// Thunks para operações assíncronas
export const fetchAboutUs = createAsyncThunk('aboutUs/fetch_aboutUs', async () => {
  const response = await apiClient.get('/aboutus');
  return response.data;
});

export const createAboutUs = createAsyncThunk('aboutUs/create', async (newItem: any) => {
  const response = await apiClient.post('/aboutus/create', newItem);
  return response.data;
});

// Slice
const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAboutUs.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar dados';
      })
      .addCase(createAboutUs.fulfilled, (state, action: PayloadAction<any>) => {
        state.data.push(action.payload);
      });
  },
});

// Exportando as actions e reducer
export const { clearError } = aboutUsSlice.actions;
export default aboutUsSlice.reducer;