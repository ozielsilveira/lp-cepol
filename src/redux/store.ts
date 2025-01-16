import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import aboutUsReducer from './slices/aboutUsSlice';
import articlesReducer from './slices/articlesSlice';
import equipamentReducer from './slices/equipamentSlice';
import professionalReducer from './slices/professionalSlice';
import researchReducer from './slices/researchSlice';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
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
const getStore = () => store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

export default getStore;