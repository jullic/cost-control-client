import React, { FC } from 'react';
import classNames from 'classnames';
import { ITagsProps } from './Tags.props';
import styles from './Tags.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { tagsActions } from '../../redux/slices/tags.slice';
import { Tag } from '../Tag/Tag';

export const Tags: FC<ITagsProps> = ({
	className,
	tags,
	onDeleteHandler,
	...props
}) => {
	if (tags.length === 0) {
		return <></>;
	}

	return (
		<div className={classNames(styles.root, className)} {...props}>
			{tags.map((tag) => (
				<Tag key={tag} onClick={onDeleteHandler(tag)}>
					{tag}
				</Tag>
			))}
		</div>
	);
};
