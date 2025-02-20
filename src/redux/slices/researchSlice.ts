import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api/axiosConfig";

export interface Research {
  id: string;
  title: string;
  description: string;
  bodyText: string;
  secondText: string | null;
  images?: { id: number; url: string; title: string; description: string }[];
  professional: {
    id: string;
    name: string;
  };
  professionalId: string;
}
interface ResearchState {
  list: Research[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

const initialState: ResearchState = {
  list: [],
  status: "idle",
  loading: false,
  error: null,
};

export const fetchResearchDetail = createAsyncThunk(
  "research/fetchDetail",
  async (id: string | Number) => {
    const response = await apiClient.get(`public/research/${id}`);
    return response.data;
  }
);

export const fetchResearch = createAsyncThunk("research/fetch", async () => {
  const response = await apiClient.get("public/research");
  return response.data.result;
});

export const createResearch = createAsyncThunk<Research, Omit<Research, "id">>(
  "professionals/create",
  async (data) => {
    const response = await apiClient.post<Research>("/research", data);
    return response.data;
  }
);

export const updateResearch = createAsyncThunk<Research, Research>(
  "research/update",
  async (data) => {
    const response = await apiClient.put<Research>(`/research`, data);
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
  name: "research",
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
      .addCase(
        fetchResearch.fulfilled,
        (state, action: PayloadAction<Research[]>) => {
          state.list = action.payload;
          state.loading = false;
          state.status = "succeeded";
        }
      )
      .addCase(fetchResearch.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
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
