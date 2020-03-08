import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {DatetimeService} from '../datetime/datetime.service';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private dateTimeService: DatetimeService) {
    }

    async saveExpenseToLocal(expense: ExpenseInterface): Promise<void> {
        const key = this.dateTimeService.getDateTimeISOWithFormat(expense.createdOn);
        console.log(key);
        debugger
        let todaysExpenses: ExpenseInterface[] = [];
        this.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
            if (expenses == null) {
                todaysExpenses.push(expense);
            } else {
                todaysExpenses = expenses;
                todaysExpenses.push(expense);
            }
        }).then(() => {
            this.saveToLocalStorage(key, todaysExpenses);
        }).catch((err) => console.log(err));
    }

    async getExpensesFromLocal(date?: Date): Promise<ExpenseInterface[]> {
        const key = date ? this.dateTimeService.getDateTimeISOWithFormat(date) : this.dateTimeService.getDateTimeISOWithFormat();
        return await this.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
            return expenses;
        });
    }

    async saveToLocalStorage(key: string, value: any): Promise<void> {
        await Plugins.Storage.set({
            key,
            value: JSON.stringify(value)
        });
    }

    async getFromLocalStorage(key: string): Promise<any> {
        const ret = await Plugins.Storage.get({key});
        return JSON.parse(ret.value);
    }


    async removeFromLocalStorage(key: string): Promise<void> {
        return await Plugins.Storage.remove({key});
    }

    async clearLocalStorage(): Promise<void> {
        return await Plugins.Storage.clear();
    }
}
