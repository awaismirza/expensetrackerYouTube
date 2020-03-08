import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActionService} from '../../../services/action/action.service';
import {ExpenseInterface} from '../../../interface/expenseInterface';
import {DatetimeService} from '../../../services/datetime/datetime.service';
import {error} from 'util';

@Component({
	selector: 'app-add-expense',
	templateUrl: './add-expense.component.html',
	styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {


	expenseForm: ExpenseInterface;


	addExpenseForm = new FormGroup({
		amount: new FormControl('', Validators.required),
		description: new FormControl(''),
		type: new FormControl('', Validators.required),
	});

	constructor(
		private modalController: ModalController,
		private actionService: ActionService,
		private dateTimeService: DatetimeService
	) {
	}

	ngOnInit() {
	}

	initCreateExpense(): void {
		const expense = this.addExpenseForm.value;
		this.dateTimeService.getSelectedDate()
			.then((date: Date) => {
				if (!expense.createdOn) {
					expense.createdOn = date
				}
			}).then(() => {
			this.actionService.createExpense(expense).then(() => {
				console.log('Expense Was Created');
				this.dismissModal();
			}).catch((err) => console.log(err));
		})
	}

	dismissModal(): void {
		this.modalController.dismiss().then().catch();
	}
}
