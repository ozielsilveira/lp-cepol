import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import aboutUsReducer from './slices/aboutUsSlice';
import articlesReducer from './slices/articlesSlice';
import equipmentReducer from './slices/equipamentSlice';
import professionalReducer from './slices/professionalSlice';
import researchReducer from './slices/researchSlice';
export const store = configureStore({
  reducer: {
    aboutUs: aboutUsReducer,
    articles: articlesReducer,
    equipment: equipmentReducer,
    professional: professionalReducer,
    research: researchReducer,
  },
});

// Inferindo os tipos do store
const getStore = () => store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;
export default getStore;