import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ICreateRecord, IRecord } from '../../interfaces/record.interface';
import { store } from '../store';
import { getDefaultDateRange } from '../../utils/date.utils';
import { fetchTags } from './tags.slice';

export const fetchRecords = createAsyncThunk<any, undefined>(
	'records/fetchRecords',
	async (_, thunkApi) => {
		const state = thunkApi.getState() as ReturnType<typeof store.getState>;
		const type = state.recordsReducer.type;
		const query = `?startDate=${state.recordsReducer.startDate}&lastDate=${state.recordsReducer.lastDate}`;
		const url = type === 'all' ? query : `${type}${query}`;
		try {
			const { data } = await axios.get(
				`http://localhost:3301/records/${url}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const createRecords = createAsyncThunk<any, ICreateRecord>(
	'records/createRecords',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.post(
				`http://localhost:3301/records`,
				body
			);
			await thunkApi.dispatch(fetchRecords());
			await thunkApi.dispatch(fetchTags());
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const fetchRecordsById = createAsyncThunk<any, any>(
	'records/fetchRecordsById',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.get(
				`http://localhost:3301/records/${id}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const deleteRecordById = createAsyncThunk<any, any>(
	'records/deleteRecordById',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.delete(
				`http://localhost:3301/records/${id}`
			);
			await thunkApi.dispatch(fetchRecords());
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const updateRecordsById = createAsyncThunk<
	any,
	{ id: string; body: ICreateRecord }
>('records/updateRecordsById', async (args, thunkApi) => {
	try {
		const { data } = await axios.patch(
			`http://localhost:3301/records/${args.id}`,
			args.body
		);
		await thunkApi.dispatch(fetchRecords());
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			thunkApi.rejectWithValue(error.response?.data || 'error');
		}
	}
});

interface IRecordsSliceState {
	status: 'loading' | 'idle' | 'error';
	records: IRecord[];
	type: 'all' | 'income' | 'expense';
	record: IRecord | null;
	lastDate: string;
	startDate: string;
}

const { lastDate, startDate } = getDefaultDateRange();

const initialState: IRecordsSliceState = {
	status: 'idle',
	type: 'expense',
	records: [],
	record: null,
	lastDate,
	startDate,
};

export const recordsSlice = createSlice({
	name: 'records',
	initialState,
	reducers: {
		getRecord(state, action: PayloadAction<IRecord | null>) {
			state.record = action.payload;
		},
		changeType(state, action: PayloadAction<'all' | 'income' | 'expense'>) {
			state.type = action.payload;
		},
		changeDateRange(
			state,
			action: PayloadAction<{ startDate: string; lastDate: string }>
		) {
			state.startDate = action.payload.startDate;
			state.lastDate = action.payload.lastDate;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchRecords.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetchRecords.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.records = action.payload;
				}
			)
			.addCase(
				fetchRecords.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				createRecords.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				createRecords.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				createRecords.rejected,
				(state, action: PayloadAction<any>) => {}
			);
	},
});

export const recordsReducer = recordsSlice.reducer;
export const recordsActions = recordsSlice.actions;
