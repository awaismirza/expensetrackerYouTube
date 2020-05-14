import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {SubscriptionLike} from 'rxjs';
import {DatetimeService} from '../../services/datetime/datetime.service';
import {ExpenseTypes} from '../../constants/constants';
import {ExpenseStorageService} from '../../services/storage/expense-storage.service';
import UserCredential = firebase.auth.UserCredential;
import {AuthService} from '../../auth/services/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

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

    userCreds: UserCredential;
    userCredsSubscription: SubscriptionLike;

    constructor(
        private modalController: ModalController,
        private dataService: DataService,
        private datetimeService: DatetimeService,
        private actionSheetController: ActionSheetController,
        private expenseService: ExpenseStorageService,
        private authService: AuthService,
        private fireAuth: AngularFireAuth,
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
                },
                error: (err) => {
                    console.log(err);
                },
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

    ngAfterViewInit(): void {
        this.fireAuth.authState.subscribe((res) => {
            console.log(res);
        });
        // this.userCredsSubscription = this.authService.getUserCredentialSubscription()
        //     .subscribe({
        //         next: (userCreds: UserCredential) => {
        //             // console.log(userCreds);
        //             this.userCreds = userCreds;
        //             // debugger
        //         },
        //         error: (err) => {
        //             console.log(err);
        //         }
        //     });

    }

}
