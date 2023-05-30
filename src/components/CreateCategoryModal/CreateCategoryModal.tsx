import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { ICreateCategoryModalProps } from './CreateCategoryModal.props';
import styles from './CreateCategoryModal.module.css';
import { Portal } from '../Portal/Portal';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { createCategories } from '../../redux/slices/categories.slice';
import { modalsActions } from '../../redux/slices/modals.slice';

export const CreateCategoryModal: FC<ICreateCategoryModalProps> = ({
	className,
	...props
}) => {
	const [name, setName] = useState('');
	const dispatch = useAppDispatch();

	const onCreateHandler = () => {
		if (name) {
			dispatch(
				createCategories({
					name: name[0].toUpperCase() + name.slice(1),
				})
			);
			dispatch(modalsActions.changeModal('none'));
		}
	};

	return (
		<Portal className={classNames(styles.root, className)} {...props}>
			<Modal>
				<div
					onClick={(e) => e.stopPropagation()}
					className={classNames(styles.wrap)}
				>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Название категории'
					/>
					<Button onClick={onCreateHandler}>Создать</Button>
				</div>
			</Modal>
		</Portal>
	);
};
