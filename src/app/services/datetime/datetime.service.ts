import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class DatetimeService {


	private _installDate: Date;
	private _todayDate: Date;
	private _selectedDate: Date;

	constructor() {}

	getCurrentDateTime(): Date{
		return moment().toDate();
	}

	createDateFromString(date: string): Date {
		return moment(date).toDate();
	}
	getDateTimeISOWithFormat(date?: Date): string {
		return date ? moment(date).format('L') : moment().format('L');
	}


	get installDate(): Date {
		return this._installDate;
	}

	set installDate(value: Date) {
		this._installDate = value;
	}

	get todayDate(): Date {
		return this._todayDate;
	}

	set todayDate(value: Date) {
		this._todayDate = value;
	}

		get selectedDate(): Date {
		return this._selectedDate;
	}

	set selectedDate(value: Date) {
		this._selectedDate = value;
	}

}
