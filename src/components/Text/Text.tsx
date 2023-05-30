import React, { FC } from 'react';
import classNames from 'classnames';
import { ITextProps } from './Text.props';
import styles from './Text.module.css';

export const Text: FC<ITextProps> = ({ className, children, ...props }) => {
	return (
		<p className={classNames(styles.root, className)} {...props}>
			{children}
		</p>
	);
};
