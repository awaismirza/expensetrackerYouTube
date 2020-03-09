import {Pipe, PipeTransform} from '@angular/core';
import {ExpenseInterface} from "../interface/expenseInterface";

@Pipe({
	name: 'catagory'
})
export class CatagoryPipe implements PipeTransform {

	transform(value: ExpenseInterface[], type: string): any {
		if (type === 'All' || type === undefined) {
			return value;
		} else {
			return value.filter(val => val.type === type);
		}
	}
}
