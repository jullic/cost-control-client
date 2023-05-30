import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { IDateComponentProps } from './DateComponent.props';
import styles from './DateComponent.module.css';
import { Category } from '../Category/Category';
import { Title } from '../Title/Title';
import { TotalResults } from '../TotalResults/TotalResults';

export const DateComponent: FC<IDateComponentProps> = ({
	className,
	records,
	date,
	...props
}) => {
	const [open, setOpen] = useState(true);
	const categories = Array.from(
		new Set(records.map((record) => record.category.name))
	).sort((a, b) => {
		if (a.toLowerCase() < b.toLowerCase()) {
			return -1;
		}
		if (a.toLowerCase() > b.toLowerCase()) {
			return 1;
		}
		return 0;
	});
	return (
		<div className={classNames(styles.root, className)} {...props}>
			<Title
				onClick={(e) => setOpen((p) => !p)}
				level={2}
				className={classNames(styles.title)}
			>
				<span>
					{new Date(date).toLocaleString('ru').split(', ')[0]}
				</span>
				<span>{<TotalResults level={3} records={records} />}</span>{' '}
			</Title>
			{open && (
				<div className={classNames(styles.categories)}>
					{categories.map((cat) => (
						<Category
							key={cat}
							name={cat}
							records={records.filter(
								(record) => record.category.name === cat
							)}
						/>
					))}
				</div>
			)}
		</div>
	);
};
