import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class DatetimeService {


	private readonly _selectedDate: BehaviorSubject<Date>;

	constructor() {
		this._selectedDate = new BehaviorSubject<Date>(moment().toDate());
	}

	private _installDate: Date;

	get installDate(): Date {
		return this._installDate;
	}

	set installDate(value: Date) {
		this._installDate = value;
	}

	async setSelectedDate(date: Date | string): Promise<void> {
		return this._selectedDate.next(typeof date === "string" ? this.createDateFromString(date) : date);
	}

	async getSelectedDate(): Promise<Date> {
		return this._selectedDate.getValue();
	}

	getSelectedDateSubscription(): BehaviorSubject<Date> {
		return this._selectedDate;
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
