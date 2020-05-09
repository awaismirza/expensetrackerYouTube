import {Injectable} from '@angular/core';
import * as moment from 'moment/moment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
    providedIn: 'root'
})
export class DatetimeService {


    private readonly selectedDateBehaviorSubject: BehaviorSubject<Date>;

    constructor() {
        this.selectedDateBehaviorSubject = new BehaviorSubject<Date>(moment().toDate());
    }

    private _installDate: Date;

    get installDate(): Date {
        return this._installDate;
    }

    set installDate(value: Date) {
        this._installDate = value;
    }

    setSelectedDate(date: Date | string): Observable<void> {
        return of(this.selectedDateBehaviorSubject.next(typeof date === 'string' ? this.createDateFromString(date) : date));
    }

    async getSelectedDate(): Promise<Date> {
        return this.selectedDateBehaviorSubject.getValue();
    }

    getSelectedDateSubscription(): BehaviorSubject<Date> {
        return this.selectedDateBehaviorSubject;
    }

    getCurrentDateTime(): Date {
        return moment().toDate();
    }

    createDateFromString(date: string): Date {
        return moment(date).toDate();
    }

    getDateTimeISOWithFormat(date?: Date): string {
        return date ? moment(date).format('L') : moment().format('L');
    }

}
