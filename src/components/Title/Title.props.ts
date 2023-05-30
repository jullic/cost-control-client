import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ITitleProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	> {
	children: ReactNode;
	level?: number;
}
