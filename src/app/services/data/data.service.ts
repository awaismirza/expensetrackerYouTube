import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {map} from 'rxjs/operators';

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

    getExpensesSubsciption(): BehaviorSubject<ExpenseInterface> {
        return this._expense;
    }

}
