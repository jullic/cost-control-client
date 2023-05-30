import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalType = 'create-record' | 'update-record' | 'create-category' | 'none';

interface IModalsSliceState {
	modal: ModalType;
}

const initialState: IModalsSliceState = {
	modal: 'none',
};

export const modalsSlice = createSlice({
	name: 'modalsSlice',
	initialState,
	reducers: {
		changeModal(state, action: PayloadAction<ModalType>) {
			state.modal = action.payload;
		},
	},
});

export const modalsReducer = modalsSlice.reducer;
export const modalsActions = modalsSlice.actions;
