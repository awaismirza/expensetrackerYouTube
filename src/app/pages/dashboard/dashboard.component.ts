import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {SubscriptionLike} from 'rxjs';
import {DatetimeService} from '../../services/datetime/datetime.service';
import {ExpenseTypes} from '../../constants/constants';
import {ExpenseStorageService} from '../../services/storage/expense-storage.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

    expenses: ExpenseInterface[];

    subscription: SubscriptionLike;
    installDate: Date;
    selectedDate: Date;
    dateSubscription: SubscriptionLike;

    todayDate: Date;

    expenseTypes: any;
    selectedType: string;

    totalSubscription: SubscriptionLike;
    todayTotal: number;

    filterByPrice: boolean;
    filterByPriceUp: boolean;


    constructor(
        private modalController: ModalController,
        private dataService: DataService,
        private datetimeService: DatetimeService,
        private actionSheetController: ActionSheetController,
        private expenseService: ExpenseStorageService,
    ) {
        this.installDate = this.datetimeService.installDate;
        this.todayDate = this.datetimeService.getCurrentDateTime();
        this.expenseTypes = ExpenseTypes;
        this.selectedType = ExpenseTypes.All.toString();
        this.todayTotal = null;
        this.selectedDate = new Date();
    }

    ngOnInit() {
        this.totalSubscription = this.dataService.getTodayTotalSubscription()
            .subscribe({
                next: (total: number) => {
                    this.todayTotal = total;
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                }
            });

        this.dateSubscription = this.datetimeService.getSelectedDateSubscription()
            .subscribe({
                next: (date: Date) => {
                    this.selectedDate = date;
                    console.log(date);
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        this.subscription = this.dataService.getExpensesSubscription()
            .subscribe({
                next: (expense: ExpenseInterface[]) => {
                    if (expense != null) {
                        this.expenses = expense;
                    } else {
                        this.expenses = [];
                    }
                    console.log(expense);
                },
                error: (err) => {
                    console.log(err);
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
        this.selectedDate = this.datetimeService.createDateFromString(value);
        this.datetimeService.setSelectedDate(value);
        this.expenseService.emitExpensesByDateFromLocal(this.selectedDate);
    }

    setCurrentToTodayDate(): void {
        this.datetimeService.setSelectedDate(this.datetimeService.getCurrentDateTime());
        // this.expenseService.emitExpensesByDateFromLocal(this.selectedDate);
    }

    changeSelectedValue(s: string): void {
        this.selectedType = s;
    }

    priceFilter(): void {
        this.expenses = this.expenses.sort((a, b) => {
            if (a.amount > b.amount) {
                return this.filterByPriceUp ? 1 : -1;
            }
            if (b.amount > a.amount) {
                return this.filterByPriceUp ? -1 : 1;
            }
            return 0;
        });
        this.filterByPrice = true;
        this.filterByPriceUp = !this.filterByPriceUp;
    }

    async presentFilterActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [
                {
                    text: 'Price',
                    icon: 'logo-usd',
                    handler: () => {
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Recent',
                    icon: 'cellular-outline',
                    handler: () => {
                        console.log('Play clicked');
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }

}
