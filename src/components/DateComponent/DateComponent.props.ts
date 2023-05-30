import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IRecord } from '../../interfaces/record.interface';

export interface IDateComponentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	records: IRecord[];
	date: string;
}
