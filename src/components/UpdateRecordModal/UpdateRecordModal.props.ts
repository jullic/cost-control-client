import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IRecord } from '../../interfaces/record.interface';

export interface IUpdateRecordModalProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	record: IRecord;
}
