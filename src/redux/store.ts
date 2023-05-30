import { modalsReducer } from './slices/modals.slice';
import { searchReducer } from './slices/search.slice';
import { categoriesReducer } from './slices/categories.slice';
import { recordsReducer } from './slices/records.slice';
import { tagsReducer } from './slices/tags.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		tagsReducer,
		recordsReducer,
		categoriesReducer,
		searchReducer,
		modalsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
