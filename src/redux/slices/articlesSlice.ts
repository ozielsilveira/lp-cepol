import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';

export interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  published: string | null;
  bodyText: string;
  secondText: string | null;
  images?: { id: number; url: string; title: string; description: string }[];
  professional?: { id: number; name: string };
  professionalId?: string
}
interface ArticleState {
  list: Article[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  list: [],
  status: "idle",
  loading: false,
  error: null,
};


export const fetchArticleDetail = createAsyncThunk(
  'research/fetchDetail',
  async (id: string | undefined) => {
    const response = await apiClient.get(`/article/${id}`);
    return response.data;
  }
);

export const fetchArticles = createAsyncThunk('article/fetch', async () => {
  const response = await apiClient.get('public/article');
  return response.data.result;
});

export const createArticle = createAsyncThunk('article/create', async (newArticle: any) => {
  const response = await apiClient.post('/article', newArticle);
  return response.data;
});

export const updateArticle = createAsyncThunk<Article, Article>(
  "article/update",
  async (data) => {
    const response = await apiClient.put<Article>(
      `/article`,
      data
    );
    return response.data;
  }
);

export const deleteArticle = createAsyncThunk<string, string>(
  "article/delete",
  async (id) => {
    await apiClient.delete(`/article/${id}`);
    return id;
  }
);

const articleSlice = createSlice({
  name: 'article',
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
       .addCase(
        fetchArticles.fulfilled,
         (state, action: PayloadAction<Article[]>) => {
           state.list = action.payload;
           state.loading = false;
           state.status = "succeeded";
         }
       )
       .addCase(fetchArticles.rejected, (state, action) => {
         state.status = "idle";
         state.loading = false;
         state.error =
           typeof action.payload === "string"
             ? action.payload
             : action.error.message || null;
       })
       .addCase(
        fetchArticleDetail.fulfilled,
         (state, action: PayloadAction<Article[]>) => {
           state.list = action.payload;
           state.status = "succeeded";
         }
       )
       .addCase(fetchArticleDetail.rejected, (state, action) => {
         state.status = "failed";
         state.error =
           typeof action.payload === "string"
             ? action.payload
             : action.error.message || null;
       })
       
       .addCase(
         createArticle.fulfilled,
         (state, action: PayloadAction<Article>) => {
           state.list.push(action.payload);
           state.status = "succeeded";
         }
       )
       .addCase(createArticle.pending, (state) => {
         state.status = "loading";
       })
       .addCase(createArticle.rejected, (state, action) => {
         state.status = "failed";
         state.error = action.error.message || null;
       })
       .addCase(
         updateArticle.fulfilled,
         (state, action: PayloadAction<Article>) => {
           const index = state.list.findIndex(
             (article) => article.id === action.payload.id
           );
           if (index !== -1) {
             state.list[index] = action.payload;
           }
           state.status = "succeeded";
         }
       )
       .addCase(updateArticle.pending, (state) => {
         state.status = "loading";
       })
       .addCase(updateArticle.rejected, (state, action) => {
         state.status = "failed";
         state.error = action.error.message || null;
       })
       .addCase(
          deleteArticle.fulfilled,
         (state, action: PayloadAction<string>) => {
           state.list = state.list.filter(
             (article) => article.id !== action.payload
           );
           state.status = "succeeded";
         }
       )
       .addCase(deleteArticle.pending, (state) => {
         state.status = "loading";
       })
       .addCase(deleteArticle.rejected, (state, action) => {
         state.status = "failed";
         state.error = action.error.message || null;
       });
   },
 });

export const { clearError } = articleSlice.actions;
export default articleSlice.reducer;