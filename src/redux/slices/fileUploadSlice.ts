import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/api/axiosConfig";

interface FileUploadState {
  imageOneUrl: string | null;
  imageTwoUrl: string | null;
  success: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

export const uploadFile = createAsyncThunk<
  { success: boolean; result: string },
  { file: File; imageType: "imageOne" | "imageTwo" }
>("file/upload", async ({ file }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data.success) {
      return rejectWithValue("Failed to upload file");
    }

    return {
      success: response.data.success,
      result: response.data.result,
    };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue((error as any).response?.data || error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

const initialState: FileUploadState = {
  imageOneUrl: null,
  imageTwoUrl: null,
  success: false,
  status: "idle",
  loading: false,
  error: null,
};

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    resetState: (state) => {
      state.imageOneUrl = null;
      state.imageTwoUrl = null;
      state.success = false;
      state.status = "idle";
      state.loading = false;
      state.error = null;
    },
    // Nova ação para definir as URLs manualmente
    setImageUrls: (
      state,
      action: {
        payload: { imageOneUrl?: string | null; imageTwoUrl?: string | null };
      }
    ) => {
      if (action.payload.imageOneUrl !== undefined) {
        state.imageOneUrl = action.payload.imageOneUrl;
      }
      if (action.payload.imageTwoUrl !== undefined) {
        state.imageTwoUrl = action.payload.imageTwoUrl;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.success = action.payload.success;
        const imageType = action.meta.arg.imageType;
        if (imageType === "imageOne") {
          state.imageOneUrl = action.payload.result;
        } else if (imageType === "imageTwo") {
          state.imageTwoUrl = action.payload.result;
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "Upload failed";
      });
  },
});

export const { resetState, setImageUrls } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
