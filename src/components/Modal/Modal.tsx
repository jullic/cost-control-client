import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IModalProps } from './Modal.props';
import styles from './Modal.module.css';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { modalsActions } from '../../redux/slices/modals.slice';

export const Modal: FC<IModalProps> = ({ className, children, ...props }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		document.body.style.maxHeight = '100vh';
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.maxHeight = '';
			document.body.style.overflow = '';
		};
	}, []);
	return (
		<div
			onClick={(e) => dispatch(modalsActions.changeModal('none'))}
			className={classNames(styles.root, className)}
			{...props}
		>
			{children}
		</div>
	);
};
