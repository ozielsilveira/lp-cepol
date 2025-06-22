import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../services/api/axiosConfig"; // Instância do Axios

// Define the interface for the AboutUs entity, assuming a similar structure to Equipment
export interface AboutUs {
  id: string;
  bodyText: string;
  secondText: string;
  createdAt: string;
 images?: { id: number; url: string; title: string; description: string }[];
  
}

// Tipagem para o estado
interface AboutUsState {
  list: AboutUs[]; // Renamed from 'data' to 'list' for consistency with EquipmentSlice
  status: "idle" | "loading" | "succeeded" | "failed"; // Added status for better state management
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: AboutUsState = {
  list: [],
  status: "idle",
  loading: false,
  error: null,
};

// Thunks para operações assíncronas
export const fetchAboutUs = createAsyncThunk<AboutUs[]>(
  "about/fetch", // Simpler action type name
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("public/about"); // Assuming a public endpoint for fetching
      if (!response.data.success) {
        return rejectWithValue("Failed to fetch About Us content");
      }
      return response.data.result as AboutUs[];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue((error as any).response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createAboutUs = createAsyncThunk<AboutUs, Omit<AboutUs, 'id'>>(
  "about/create",
  async (newAboutUs, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/about", newAboutUs); // Endpoint for creating
      if (!response.data) {
        return rejectWithValue("Failed to create About Us content");
      }
      return response.data as AboutUs;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue((error as any).response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateAboutUs = createAsyncThunk<AboutUs, AboutUs>(
  "about/update",
  async (updatedAboutUs, { rejectWithValue }) => {
    try {
      const response = await apiClient.put<AboutUs>(`/about`, updatedAboutUs); // Endpoint for updating
      if (!response.data) {
        return rejectWithValue("Failed to update About Us content");
      }
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue((error as any).response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteAboutUs = createAsyncThunk<string, string>( // Returns the ID of the deleted item
  "about/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/about/${id}`); // Endpoint for deleting
      if (!response.data.success) {
        return rejectWithValue("Failed to delete About Us content");
      }
      return id; // Return the ID to filter it out from the state
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue((error as any).response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Slice
const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch About Us
      .addCase(fetchAboutUs.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(
        fetchAboutUs.fulfilled,
        (state, action: PayloadAction<AboutUs[]>) => {
          state.loading = false;
          state.list = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || null;
      })
      // Create About Us
      .addCase(createAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createAboutUs.fulfilled,
        (state, action: PayloadAction<AboutUs>) => {
          state.list.push(action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(createAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || null;
      })
      // Update About Us
      .addCase(updateAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateAboutUs.fulfilled,
        (state, action: PayloadAction<AboutUs>) => {
          const index = state.list.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
          state.status = "succeeded";
        }
      )
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || null;
      })
      // Delete About Us
      .addCase(deleteAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteAboutUs.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter((item) => item.id !== action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(deleteAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || null;
      });
  },
});

// Exportando as actions e reducer
export const { clearError } = aboutUsSlice.actions;
export default aboutUsSlice.reducer;