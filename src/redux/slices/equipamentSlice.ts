import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api/axiosConfig";

export interface Equipment {
  id: string;
  name: string;
  description: string;
  type: string;
  imageUrl: string | null;
}
interface EquipmentsState {
  list: Equipment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

const initialState: EquipmentsState = {
  list: [],
  status: "idle",
  loading: false,
  error: null,
};

export const fetchEquipments = createAsyncThunk<Equipment[]>(
  "equipaments/fetch",
  async (_, { rejectWithValue }) => {
    // const response = await apiClient.get("public/equipment");
    // return response.data.result;



    try {
      const response = await apiClient.get("public/equipment");
      if (!response.data.success) {
        return rejectWithValue("Failed to fetch equipment");
      }
      return response.data.result as Equipment[];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue((error as any).response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createEquipment = createAsyncThunk(
  "equipaments/create",
  async (newArticle: any) => {
    const response = await apiClient.post("/equipment", newArticle);
    return response.data;
  }
);

export const updateEquipment = createAsyncThunk<Equipment, Equipment>(
  "equipment/update",
  async (data) => {
    const response = await apiClient.put<Equipment>(`/equipment`, data);
    return response.data;
  }
);

export const deleteEquipment = createAsyncThunk<string, string>(
  "equipment/delete",
  async (id) => {
    await apiClient.delete(`/equipment/${id}`);
    return id;
  }
);

const equipmentSlice = createSlice({
  name: "equipments",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchEquipments.fulfilled,
        (state, action: PayloadAction<Equipment[]>) => {
          state.list = action.payload;
          state.loading = false;
          state.status = "succeeded";
        }
      )
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || null;
      })
      .addCase(
        createEquipment.fulfilled,
        (state, action: PayloadAction<Equipment>) => {
          state.list.push(action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(createEquipment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        updateEquipment.fulfilled,
        (state, action: PayloadAction<Equipment>) => {
          const index = state.list.findIndex(
            (equipament) => equipament.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
          state.status = "succeeded";
        }
      )
      .addCase(updateEquipment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        deleteEquipment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter(
            (professional) => professional.id !== action.payload
          );
          state.status = "succeeded";
        }
      )
      .addCase(deleteEquipment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { clearError } = equipmentSlice.actions;
export default equipmentSlice.reducer;
