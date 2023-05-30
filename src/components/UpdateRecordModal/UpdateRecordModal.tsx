import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { IUpdateRecordModalProps } from './UpdateRecordModal.props';
import styles from './UpdateRecordModal.module.css';
import { InputWithDropdown } from '../InputWithDropdown/InputWithDropdown';
import { Tags } from '../Tags/Tags';
import { Input } from '../Input/Input';
import { fetchCategories } from '../../redux/slices/categories.slice';
import { fetchTags } from '../../redux/slices/tags.slice';
import { modalsActions } from '../../redux/slices/modals.slice';
import {
	fetchRecords,
	updateRecordsById,
} from '../../redux/slices/records.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { Portal } from '../Portal/Portal';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

export const UpdateRecordModal: FC<IUpdateRecordModalProps> = ({
	className,
	record,
	...props
}) => {
	const { categories } = useAppSelector((state) => state.categoriesReducer);
	const [category, setCategory] = useState(record.category.name);
	const [type, setType] = useState(record.type);
	const [newTags, setNewTags] = useState<string[]>(record.tags);
	const [date, setDate] = useState(
		new Date(record.date)
			.toLocaleString('ru')
			.split(', ')[0]
			.split('.')
			.reverse()
			.join('-')
	);
	const [name, setName] = useState(record.name);
	const [sum, setSum] = useState(record.sum + '');

	const dispatch = useAppDispatch();

	const onClickAddHandler = (tag: string) => {
		return () => {
			setNewTags((p) => Array.from(new Set([tag, ...p])));
		};
	};

	const onDeleteHandler = (name: string) => () =>
		setNewTags((p) => p.filter((item) => item !== name));

	const onCreateHandler = () => {
		if (
			category &&
			type &&
			newTags &&
			date &&
			name &&
			sum &&
			!Number.isNaN(+sum)
		) {
			const [year, month, day] = date.split('-');
			dispatch(
				updateRecordsById({
					id: record.id,
					body: {
						categoryName: category,
						date: new Date(+year, +month - 1, +day),
						name,
						sum: +sum,
						tags: newTags,
						type: type as 'income' | 'expense',
					},
				})
			);
			dispatch(modalsActions.changeModal('none'));
			dispatch(fetchTags());
		}
	};

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchTags());
	}, []);

	return (
		<Portal className={classNames(styles.root, className)} {...props}>
			<Modal>
				<div
					onClick={(e) => e.stopPropagation()}
					className={classNames(styles.wrap)}
				>
					<select
						value={category}
						onChange={(e) => {
							setCategory(e.target.value);
							window.localStorage.setItem(
								'lastCategory',
								e.target.value
							);
						}}
						title='Категория'
					>
						{categories.map((cat) => (
							<option key={cat.name} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
					<select
						value={type}
						onChange={(e) => {
							setType(e.target.value as 'income' | 'expense');
							window.localStorage.setItem(
								'lastType',
								e.target.value
							);
						}}
					>
						<option value='expense'>Расходы</option>
						<option value='income'>Доходы</option>
					</select>
					<InputWithDropdown onClickAddHandler={onClickAddHandler} />
					<Tags onDeleteHandler={onDeleteHandler} tags={newTags} />
					<Input
						value={date}
						onChange={(e) => {
							if (e.target.value) {
								setDate(e.target.value);
							}
						}}
						type='date'
					/>
					<Input
						name='cost-name-input'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Название'
					/>
					<Input
						value={sum}
						onChange={(e) => setSum(e.target.value)}
						placeholder='Сумма'
						type='number'
					/>
					<Button onClick={onCreateHandler}>Обновить</Button>
				</div>
			</Modal>
		</Portal>
	);
};
