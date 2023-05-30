import { ICategory } from './category.interface';

export interface IRecord {
	id: string;
	category: ICategory;
	categoryName: string;
	tags: string[];
	name: string;
	date: string;
	type: 'income' | 'expense';
	sum: number;
	deleted: boolean;
	deleteDate: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICreateRecord {
	categoryName: string;
	tags: string[];
	name: string;
	date: Date;
	type: 'income' | 'expense';
	sum: number;
}
