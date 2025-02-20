import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../services/api/axiosConfig";

export interface Professional {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string | null;
  hierarchy: number;
  createdAt: string;
}

interface ProfessionalsState {
  list: Professional[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

// Thunks
export const fetchProfessionals = createAsyncThunk<Professional[]>(
  "professionals/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/public/professional");
      console.log(response.data);
      if (!response.data.success) {
        return rejectWithValue("Failed to fetch professionals");
      }
      return response.data.result as Professional[];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue((error as any).response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createProfessional = createAsyncThunk<
  Professional,
  Omit<Professional, "id">
>("professionals/create", async (data) => {
  const response = await apiClient.post<Professional>("/professional", data);
  return response.data;
});

export const updateProfessional = createAsyncThunk<Professional, Professional>(
  "professionals/update",
  async (data) => {
    const response = await apiClient.put<Professional>(`/professional`, data);
    return response.data;
  }
);

export const deleteProfessional = createAsyncThunk<string, string>(
  "professionals/delete",
  async (id) => {
    await apiClient.delete(`/professional/${id}`);
    return id;
  }
);

// Slice
const initialState: ProfessionalsState = {
  list: [],
  status: "idle",
  loading: false,
  error: null,
};

const professionalSlice = createSlice({
  name: "professionals",
  initialState,
  reducers: {
    resetState: (state) => {
      state.list = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfessionals.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProfessionals.fulfilled,
        (state, action: PayloadAction<Professional[]>) => {
          state.list = action.payload;
          state.loading = false;
          state.status = "succeeded";
        }
      )
      .addCase(fetchProfessionals.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || null;
      })
      .addCase(
        createProfessional.fulfilled,
        (state, action: PayloadAction<Professional>) => {
          state.list.push(action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(createProfessional.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProfessional.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        updateProfessional.fulfilled,
        (state, action: PayloadAction<Professional>) => {
          const index = state.list.findIndex(
            (professional) => professional.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
          state.status = "succeeded";
        }
      )
      .addCase(updateProfessional.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfessional.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        deleteProfessional.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter(
            (professional) => professional.id !== action.payload
          );
          state.status = "succeeded";
        }
      )
      .addCase(deleteProfessional.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProfessional.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { resetState } = professionalSlice.actions;

export default professionalSlice.reducer;
