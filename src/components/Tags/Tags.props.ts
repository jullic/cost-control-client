import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ITagsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tags: string[];
	onDeleteHandler: (name: string) => () => void;
}
