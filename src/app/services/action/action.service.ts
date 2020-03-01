import {Injectable} from '@angular/core';
import {DataService} from '../data/data.service';
import {ExpenseInterface} from '../../interface/expenseInterface';

@Injectable({
    providedIn: 'root'
})
export class ActionService{


    constructor(private dataService: DataService) {
    }

    async createExpense(expense: ExpenseInterface): Promise<void> {
        return this.dataService.setExpenses(expense);
    }
}
