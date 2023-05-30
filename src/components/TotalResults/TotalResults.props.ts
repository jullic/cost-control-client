import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IRecord } from '../../interfaces/record.interface';

export interface ITotalResultsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	records: IRecord[];
	level: number;
}
