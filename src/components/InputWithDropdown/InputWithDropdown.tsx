import React, {
	FC,
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useMemo,
	useState,
} from 'react';
import classNames from 'classnames';
import { IInputWithDropdownProps } from './InputWithDropdown.props';
import styles from './InputWithDropdown.module.css';
import { Input } from '../Input/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { tagsActions } from '../../redux/slices/tags.slice';

export const InputWithDropdown: FC<IInputWithDropdownProps> = ({
	className,
	onClickAddHandler,
	...props
}) => {
	const [open, setOpen] = useState(false);
	const { tags, activeTags } = useAppSelector((state) => state.tagsReducer);
	const [search, setSearch] = useState('');
	const dispatch = useAppDispatch();

	const searchedTags = useMemo(
		() => tags.filter((tag) => tag.name.match(new RegExp(search, 'gim'))),
		[tags, search]
	);

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && search !== '') {
			onClickAddHandler(search)();
			setSearch('');
			setOpen(false);
		}
	};

	useEffect(() => {
		if (open) {
			const handler = (e: any) => {
				if (!(e.target instanceof Element)) {
					return;
				}
				if (!e.target.closest('[data-tag-search-wrap]')) {
					setOpen(false);
				}
			};
			window.addEventListener('mousedown', handler);
			window.addEventListener('touchstart', handler);

			return () => {
				window.removeEventListener('mousedown', handler);
				window.removeEventListener('touchstart', handler);
			};
		}
	}, [open]);

	return (
		<div
			data-tag-search-wrap
			className={classNames(styles.root, className)}
			{...props}
		>
			<div className={classNames(styles.wrap)}>
				<Input
					onKeyDown={onKeyDownHandler}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onFocus={(e) => setOpen(true)}
					placeholder='Тэги'
				/>
				{open && searchedTags.length !== 0 && (
					<div className={classNames(styles.data)}>
						{searchedTags.map((item) => (
							<div
								onClick={(e) => {
									onClickAddHandler(item.name)();
									setOpen(false);
									setSearch('');
								}}
								key={item.name}
								className={classNames(styles.item)}
							>
								{item.name}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
