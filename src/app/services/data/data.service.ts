import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ExpenseInterface} from '../../interface/expenseInterface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private readonly _expense: BehaviorSubject<ExpenseInterface>;

    constructor() {
        this._expense = new BehaviorSubject<ExpenseInterface>(null);
    }


    async getExpenses(): Promise<ExpenseInterface> {
        return this._expense.getValue();
    }

    async setExpenses(expenses: ExpenseInterface): Promise<void> {
        return this._expense.next(expenses);
    }

    getExpensesSubscription(): BehaviorSubject<ExpenseInterface> {
        return this._expense;
    }

}
