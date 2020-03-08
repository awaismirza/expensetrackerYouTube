import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ExpenseInterface} from '../../interface/expenseInterface';

@Injectable({
    providedIn: 'root'
})
export class DataService {


    private readonly _expenses: BehaviorSubject<ExpenseInterface[]>;

    constructor() {
        this._expenses = new BehaviorSubject<ExpenseInterface[]>(null);
    }


    async getExpenses(): Promise<ExpenseInterface[]> {
        return this._expenses.getValue();
    }

    async setExpenses(expenses: ExpenseInterface[]): Promise<void> {
        return this._expenses.next(expenses);
    }

    getExpensesSubscription(): BehaviorSubject<ExpenseInterface[]> {
        return this._expenses;
    }
}
