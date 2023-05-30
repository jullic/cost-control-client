import React, { FC } from 'react';

import { IModalsProps } from './Modals.props';
import { useAppSelector } from '../../hooks/redux.hooks';
import { CreateCategoryModal } from '../CreateCategoryModal/CreateCategoryModal';
import { CreateRecordModal } from '../CreateRecordModal/CreateRecordModal';
import { UpdateRecordModal } from '../UpdateRecordModal/UpdateRecordModal';

export const Modals: FC<IModalsProps> = ({ className, ...props }) => {
	const { modal } = useAppSelector((state) => state.modalsReducer);
	const { record } = useAppSelector((state) => state.recordsReducer);
	return (
		<>
			{modal === 'create-category' && <CreateCategoryModal />}
			{modal === 'create-record' && <CreateRecordModal />}
			{modal === 'update-record' && record && (
				<UpdateRecordModal record={record} />
			)}
		</>
	);
};
