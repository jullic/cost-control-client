import React, { FC } from 'react';
import classNames from 'classnames';
import { IButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button: FC<IButtonProps> = ({
	className,
	children,
	variant = 'dark',
	active = false,
	...props
}) => {
	return (
		<button
			className={classNames(styles.root, className, styles[variant], {
				[styles.active]: active,
			})}
			{...props}
		>
			{children}
		</button>
	);
};
