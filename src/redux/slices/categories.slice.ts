import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ICategory } from '../../interfaces/category.interface';

export const fetchCategories = createAsyncThunk<any, undefined>(
	'categories/fetchCategories',
	async (_, thunkApi) => {
		try {
			const { data } = await axios.get(
				`http://localhost:3301/categories`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const createCategories = createAsyncThunk<any, { name: string }>(
	'categories/createCategories',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.post(
				`http://localhost:3301/categories`,
				body
			);
			await thunkApi.dispatch(fetchCategories());
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const fetchCategoriesById = createAsyncThunk<any, any>(
	'categories/fetchCategoriesById',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.get(
				`http://localhost:3301/categories/${id}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const deleteCategoriesById = createAsyncThunk<any, any>(
	'categories/deleteCategoriesById',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.delete(
				`http://localhost:3301/categories/${id}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const updateCategoriesById = createAsyncThunk<any, any>(
	'categories/updateCategoriesById',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.patch(
				`http://localhost:3301/categories/${body.id}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

interface ICategoriesSliceState {
	status: 'loading' | 'idle' | 'error';
	categories: ICategory[];
	currentCategory: ICategory | null;
}

const initialState: ICategoriesSliceState = {
	status: 'idle',
	categories: [],
	currentCategory: null,
};

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchCategories.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetchCategories.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.categories = [...action.payload];
				}
			)
			.addCase(
				fetchCategories.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				createCategories.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				createCategories.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				createCategories.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				fetchCategoriesById.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetchCategoriesById.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetchCategoriesById.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				deleteCategoriesById.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				deleteCategoriesById.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				deleteCategoriesById.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				updateCategoriesById.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				updateCategoriesById.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				updateCategoriesById.rejected,
				(state, action: PayloadAction<any>) => {}
			);
	},
});

export const categoriesReducer = categoriesSlice.reducer;
export const categoriesActions = categoriesSlice.actions;
