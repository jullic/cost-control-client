import React, { FC } from 'react';
import classNames from 'classnames';
import { ITagProps } from './Tag.props';
import styles from './Tag.module.css';

export const Tag: FC<ITagProps> = ({ className, children, ...props }) => {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			{children}
		</div>
	);
};
