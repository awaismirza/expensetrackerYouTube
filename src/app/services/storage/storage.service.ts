import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {DatetimeService} from '../datetime/datetime.service';
import {DataService} from '../data/data.service';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(
        private dataService: DataService
    ) {}

    async saveToLocalStorage(key: string, value: any): Promise<void> {
        return await Plugins.Storage.set({
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

    async clearLocalStorage(isReset?: boolean): Promise<void> {
        if (isReset) {
            this.dataService.setExpenses([]);
        }
        return await Plugins.Storage.clear();
    }
}
