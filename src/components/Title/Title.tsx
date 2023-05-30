import React, { FC } from 'react';
import classNames from 'classnames';
import { ITitleProps } from './Title.props';
import styles from './Title.module.css';

export const Title: FC<ITitleProps> = ({
	className,
	children,
	level = 1,
	...props
}) => {
	if (level === 1) {
		return (
			<h1 className={classNames(styles.root, className)} {...props}>
				{children}
			</h1>
		);
	}
	if (level === 2) {
		return (
			<h2 className={classNames(styles.root, className)} {...props}>
				{children}
			</h2>
		);
	}
	if (level === 3) {
		return (
			<h3 className={classNames(styles.root, className)} {...props}>
				{children}
			</h3>
		);
	}
	if (level === 4) {
		return (
			<h4 className={classNames(styles.root, className)} {...props}>
				{children}
			</h4>
		);
	}
	return <></>;
};
