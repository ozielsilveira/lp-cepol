import { configureStore } from '@reduxjs/toolkit';
import aboutUsReducer from './slices/aboutUsSlice';
import articlesReducer from './slices/articlesSlice';
import equipamentReducer from './slices/equipamentSlice';
import professionalReducer from './slices/professionalSlice';
import researchReducer from './slices/researchSlice';

export const store = configureStore({
  reducer: {
    aboutUs: aboutUsReducer,
    articles: articlesReducer,
    equipament: equipamentReducer,
    professional: professionalReducer,
    research: researchReducer,
  },
});

// Inferindo os tipos do store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;