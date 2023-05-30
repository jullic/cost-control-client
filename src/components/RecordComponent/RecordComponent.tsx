import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { IRecordComponentProps } from './RecordComponent.props';
import styles from './RecordComponent.module.css';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../hooks/redux.hooks';
import {
	deleteRecordById,
	recordsActions,
} from '../../redux/slices/records.slice';
import { modalsActions } from '../../redux/slices/modals.slice';
import { Tag } from '../Tag/Tag';

export const RecordComponent: FC<IRecordComponentProps> = ({
	className,
	record,
	...props
}) => {
	const dispatch = useAppDispatch();

	const onDeleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(deleteRecordById(record.id));
	};

	const onOpenHandler = () => {
		dispatch(recordsActions.getRecord(record));
		dispatch(modalsActions.changeModal('update-record'));
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={onOpenHandler}
			className={classNames(styles.root, className)}
			{...props}
		>
			<div className={classNames(styles.wrap)}>
				<span>
					<b>{record.name}</b>
				</span>
				<span>
					<b>
						<span className={classNames(styles.tags)}>
							{record.tags.map((tag) => (
								<Tag
									className={classNames(styles.tag)}
									key={tag}
								>
									{tag}
								</Tag>
							))}
						</span>
					</b>
				</span>
				<span>
					<b>
						{' '}
						{record.type === 'expense' ? '-' : ''}
						{record.sum.toLocaleString('ru')}
					</b>{' '}
					руб
				</span>
			</div>
			<Button onDoubleClick={onDeleteHandler} variant='danger'>
				Удалить
			</Button>
		</div>
	);
};
