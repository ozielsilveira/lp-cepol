import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api/axiosConfig';

export interface Research {
  id: string;
  title: string;
  description: string;
  bodyText: string;
  secondText: string | null;
  images: [{
    url: string,
    title: string,
    description: string
  }];
  professional:{
    id: number,
    name: string
  }
}
interface ResearchState {
  list: Research[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResearchState = {
  list: [],
  status: "idle",
  error: null,
};


export const fetchResearchDetail = createAsyncThunk(
  'research/fetchDetail',
  async (id: string) => {
    const response = await apiClient.get(`/research/${id}`);
    return response.data;
  }
);

export const fetchResearch = createAsyncThunk('research/fetch', async () => {
  const response = await apiClient.get('public/research');
  return response.data.result;
});

export const createResearch = createAsyncThunk('research/create', async (newResearch: any) => {
  const response = await apiClient.post('/research/create', newResearch);
  return response.data;
});

export const updateResearch = createAsyncThunk<Research, Research>(
  "research/update",
  async (data) => {
    const response = await apiClient.put<Research>(
      `/research/${data.id}`,
      data
    );
    return response.data;
  }
);

export const deleteResearch = createAsyncThunk<string, string>(
  "research/delete",
  async (id) => {
    await apiClient.delete(`/research/${id}`);
    return id;
  }
);

const researchSlice = createSlice({
  name: 'research',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
     builder
       .addCase(
        fetchResearch.fulfilled,
         (state, action: PayloadAction<Research[]>) => {
           state.list = action.payload;
           state.status = "succeeded";
         }
       )
       .addCase(fetchResearch.rejected, (state, action) => {
         state.status = "failed";
         state.error =
           typeof action.payload === "string"
             ? action.payload
             : action.error.message || null;
       })
       .addCase(
        fetchResearchDetail.fulfilled,
         (state, action: PayloadAction<Research[]>) => {
           state.list = action.payload;
           state.status = "succeeded";
         }
       )
       .addCase(fetchResearchDetail.rejected, (state, action) => {
         state.status = "failed";
         state.error =
           typeof action.payload === "string"
             ? action.payload
             : action.error.message || null;
       })
       .addCase(
         createResearch.fulfilled,
         (state, action: PayloadAction<Research>) => {
           state.list.push(action.payload);
           state.status = "succeeded";
         }
       )
       .addCase(createResearch.pending, (state) => {
         state.status = "loading";
       })
       .addCase(createResearch.rejected, (state, action) => {
         state.status = "failed";
         state.error = action.error.message || null;
       })
       .addCase(
         updateResearch.fulfilled,
         (state, action: PayloadAction<Research>) => {
           const index = state.list.findIndex(
             (research) => research.id === action.payload.id
           );
           if (index !== -1) {
             state.list[index] = action.payload;
           }
           state.status = "succeeded";
         }
       )
       .addCase(updateResearch.pending, (state) => {
         state.status = "loading";
       })
       .addCase(updateResearch.rejected, (state, action) => {
         state.status = "failed";
         state.error = action.error.message || null;
       })
       .addCase(
          deleteResearch.fulfilled,
         (state, action: PayloadAction<string>) => {
           state.list = state.list.filter(
             (professional) => professional.id !== action.payload
           );
           state.status = "succeeded";
         }
       )
       .addCase(deleteResearch.pending, (state) => {
         state.status = "loading";
       })
       .addCase(deleteResearch.rejected, (state, action) => {
         state.status = "failed";
         state.error = action.error.message || null;
       });
   },
 });

export const { clearError } = researchSlice.actions;
export default researchSlice.reducer;