import React, { FC } from 'react';
import classNames from 'classnames';
import { ITotalResultsProps } from './TotalResults.props';
import styles from './TotalResults.module.css';
import { Title } from '../Title/Title';

export const TotalResults: FC<ITotalResultsProps> = ({
	className,
	records,
	level,
	...props
}) => {
	const totalSum = records.reduce(
		(prev, record) =>
			record.type === 'expense' ? prev - record.sum : prev + record.sum,
		0
	);
	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={classNames(styles.wrap)}>
				<Title level={level}>
					Итого: <span>{totalSum.toLocaleString('ru')}</span> руб
				</Title>
			</div>
		</div>
	);
};
