import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IInputWithDropdownProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	onClickAddHandler: (tag: string) => () => void;
}
