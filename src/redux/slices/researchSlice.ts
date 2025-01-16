import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';

interface researchState {
  data: any[];
  detailedResearch: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: researchState = {
  data: [],
  detailedResearch: null,
  loading: false,
  error: null,
};

// AsyncThunk para buscar detalhes de uma pesquisa
export const fetchResearchDetail = createAsyncThunk(
  'research/fetchDetail',
  async (id: string) => {
    const response = await apiClient.get(`/research/${id}`);
    return response.data;
  }
);

export const fetchResearch = createAsyncThunk('research/fetch', async () => {
  const response = await apiClient.get('/research');
  return response.data;
});

export const createResearch = createAsyncThunk('research/create', async (newArticle: any) => {
  const response = await apiClient.post('/research/create', newArticle);
  return response.data;
});

const researchSlice = createSlice({
  name: 'research',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearDetailedResearch(state) {
      state.detailedResearch = null;
    },
  },
  extraReducers: (builder) => {
    builder
     // Fetch Research List
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

    // Create Research
    .addCase(createResearch.fulfilled, (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    })

    // Fetch Research Detail
    .addCase(fetchResearchDetail.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchResearchDetail.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.detailedResearch = action.payload;
    })
    .addCase(fetchResearchDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Erro ao buscar detalhes da pesquisa';
    });
  },
});

export const { clearError, clearDetailedResearch } = researchSlice.actions;
export default researchSlice.reducer;