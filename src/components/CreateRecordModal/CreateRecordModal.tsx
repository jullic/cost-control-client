import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ICreateRecordModalProps } from './CreateRecordModal.props';
import styles from './CreateRecordModal.module.css';
import { Portal } from '../Portal/Portal';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchCategories } from '../../redux/slices/categories.slice';
import { InputWithDropdown } from '../InputWithDropdown/InputWithDropdown';
import { Tags } from '../Tags/Tags';
import { createRecords } from '../../redux/slices/records.slice';
import { modalsActions } from '../../redux/slices/modals.slice';
import { fetchTags } from '../../redux/slices/tags.slice';

export const CreateRecordModal: FC<ICreateRecordModalProps> = ({
	className,
	...props
}) => {
	const { categories } = useAppSelector((state) => state.categoriesReducer);
	const [category, setCategory] = useState(
		window.localStorage.getItem('lastCategory') || categories[0]?.name || ''
	);
	const [type, setType] = useState(
		window.localStorage.getItem('lastType') || 'expense'
	);
	const [newTags, setNewTags] = useState<string[]>([]);
	const [date, setDate] = useState(
		new Date()
			.toLocaleString('ru')
			.split(', ')[0]
			.split('.')
			.reverse()
			.join('-')
	);
	const [name, setName] = useState('');
	const [sum, setSum] = useState('');

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
				createRecords({
					categoryName: category,
					date: new Date(+year, +month - 1, +day),
					name,
					sum: +sum,
					tags: newTags,
					type: type as 'income' | 'expense',
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
				<form
					onSubmit={(e) => e.preventDefault()}
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
							setType(e.target.value);
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
					<Button type='submit' onClick={onCreateHandler}>
						Создать
					</Button>
				</form>
			</Modal>
		</Portal>
	);
};
