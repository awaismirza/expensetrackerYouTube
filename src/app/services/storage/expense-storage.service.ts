import {Injectable} from '@angular/core';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {DatetimeService} from '../datetime/datetime.service';
import {StorageService} from './storage.service';
import {DataService} from '../data/data.service';

@Injectable({
    providedIn: 'root'
})
export class ExpenseStorageService {

    constructor(
        private datetimeService: DatetimeService,
        private storageService: StorageService,
        private dataService: DataService,
    ) {
        this.getExpensesFromLocal();
    }


    async createExpense(expense: ExpenseInterface): Promise<void> {
        const key = this.datetimeService.getDateTimeISOWithFormat(expense.createdOn);
        let expensesList: ExpenseInterface[] = [];
        this.storageService.getFromLocalStorage(key)
            .then((storedExpenses) => {
                if (storedExpenses == null) {
                    expensesList.push(expense);
                } else {
                    expensesList = storedExpenses;
                    expensesList.push(expense);
                }
                return expensesList;
            })
            .then(() => {
                this.storageService.saveToLocalStorage(key, expensesList);
            })
            .then(() => {
                this.dataService.setExpenses(expensesList);
            })
            .catch((err) => console.log(err));
    }

    async getTodayExpensesFromLocal(): Promise<void> {
        return this.getExpensesFromLocal().then((expenses: ExpenseInterface[]) => {
            this.dataService.setExpenses(expenses);
        });
    }

    async emitExpensesByDateFromLocal(date: Date): Promise<void> {
         return this.getExpensesFromLocal(date).then((expenses) => {
            this.dataService.setExpenses(expenses);
        });
    }

    async saveExpenseToLocal(expense: ExpenseInterface): Promise<void> {
        const key = this.datetimeService.getDateTimeISOWithFormat(expense.createdOn);
        let expensesList: ExpenseInterface[] = [];
        return this.storageService.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
            if (expenses == null) {
                expensesList.push(expense);
            } else {
                expensesList = expenses;
                expensesList.push(expense);
            }
        }).then(() => {
            this.storageService.saveToLocalStorage(key, expensesList).then(() => {
                this.dataService.setExpenses(expensesList);
            })
        }).catch((err) => console.log(err));
    }

    async getExpensesFromLocal(date?: Date): Promise<ExpenseInterface[]> {
        const key = date ? this.datetimeService.getDateTimeISOWithFormat(date) : this.datetimeService.getDateTimeISOWithFormat();
        return await this.storageService.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
            return expenses;
        });
    }
}
