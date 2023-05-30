import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IRecord } from '../../interfaces/record.interface';

export interface ICategoryProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	name: string;
	records: IRecord[];
}
