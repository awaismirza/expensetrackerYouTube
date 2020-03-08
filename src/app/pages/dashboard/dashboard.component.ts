import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {SubscriptionLike} from 'rxjs';
import {ActionService} from '../../services/action/action.service';
import {DatetimeService} from "../../services/datetime/datetime.service";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

	expenses: ExpenseInterface[];
	subscription: SubscriptionLike;
	todayDate: Date;
	installDate: Date;
	selectedDate: Date;

	constructor(
		private modalController: ModalController,
		private dataService: DataService,
		private actionsService: ActionService,
        private datetimeService: DatetimeService,
	) {
		this.actionsService.getTodayExpensesFromLocal().then((value => this.expenses = value));
		this.todayDate = this.datetimeService.todayDate;
		this.installDate = this.datetimeService.installDate;
	}

	ngOnInit() {
		this.selectedDate = this.datetimeService.getCurrentDateTime();
		this.subscription = this.dataService.getExpensesSubscription()
			.subscribe({
				next: (expense) => {
					if (!this.expenses) {
						this.expenses = [];
					}
					if (expense != null) {
						this.expenses.push(expense);
					}
				},
				error: (err) => {
					console.log(err)
				},
				complete: () => {
				}
			});
	}

	async presentModal() {
		const modal = await this.modalController.create({
			component: AddExpenseComponent
		});
		return await modal.present();
	}

	ngOnDestroy(): void {
	}

	changeSelectedDate(value: string): void {
		this.datetimeService.selectedDate = this.datetimeService.createDateFromString(value);
		this.selectedDate = this.datetimeService.createDateFromString(value);
	}

	setCurrentToTodayDate(): void {
		this.todayDate = this.datetimeService.getCurrentDateTime();
		this.selectedDate = this.datetimeService.getCurrentDateTime();
	}
}
