import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ITag } from '../../interfaces/tag.interface';

export const fetchTags = createAsyncThunk<any, undefined>(
	'tags/fetchTags',
	async (_, thunkApi) => {
		try {
			const { data } = await axios.get(
				`http://localhost:3301/records/tags`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

interface ITagsSliceState {
	status: 'loading' | 'idle' | 'error';
	tags: ITag[];
	activeTags: string[];
}

const initialState: ITagsSliceState = {
	status: 'idle',
	tags: [],
	activeTags: [],
};

export const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		changeActiveTags(state, action: PayloadAction<string>) {
			state.activeTags = Array.from(
				new Set([action.payload, ...state.activeTags])
			);
		},
		deleteTag(state, action: PayloadAction<string>) {
			state.activeTags = state.activeTags.filter(
				(tag) => tag !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchTags.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetchTags.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.tags = action.payload;
				}
			)
			.addCase(
				fetchTags.rejected,
				(state, action: PayloadAction<any>) => {}
			);
	},
});

export const tagsReducer = tagsSlice.reducer;
export const tagsActions = tagsSlice.actions;
