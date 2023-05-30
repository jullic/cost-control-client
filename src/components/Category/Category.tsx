import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { ICategoryProps } from './Category.props';
import styles from './Category.module.css';
import { Title } from '../Title/Title';
import { RecordComponent } from '../RecordComponent/RecordComponent';
import { TotalResults } from '../TotalResults/TotalResults';

export const Category: FC<ICategoryProps> = ({
	className,
	name,
	records,
	...props
}) => {
	const [open, setOpen] = useState(true);

	return (
		<div
			onClick={(e) => setOpen((p) => !p)}
			className={classNames(styles.root, className)}
			{...props}
		>
			<Title className={classNames(styles.title)} level={3}>
				<span>{name}</span>
				<span>
					<TotalResults level={4} records={records} />
				</span>
			</Title>
			{open && (
				<div className={classNames(styles.records)}>
					{records
						.sort(
							(a, b) =>
								new Date(b.updatedAt).getTime() -
								new Date(a.updatedAt).getTime()
						)
						.map((record) => (
							<RecordComponent key={record.id} record={record} />
						))}
				</div>
			)}
		</div>
	);
};
