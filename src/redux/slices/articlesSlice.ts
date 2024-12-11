import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';

interface ArticlesState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk('articles/fetch', async () => {
  const response = await apiClient.get('/articles');
  return response.data;
});

export const createArticle = createAsyncThunk('articles/create', async (newArticle: any) => {
  const response = await apiClient.post('/articles', newArticle);
  return response.data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar artigos';
      })
      .addCase(createArticle.fulfilled, (state, action: PayloadAction<any>) => {
        state.data.push(action.payload);
      });
  },
});

export const { clearError } = articlesSlice.actions;
export default articlesSlice.reducer;