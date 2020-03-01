import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {SubscriptionLike} from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

    expenses: ExpenseInterface[];
    subscription: SubscriptionLike;

    constructor(private modalController: ModalController, private dataService: DataService) {
        this.expenses = [];
    }

    ngOnInit() {
        this.subscription = this.dataService.getExpensesSubsciption()
            .subscribe({
                next: (expense) => {
                    console.log(expense);
                    if(expense != null) {
                        this.expenses.push(expense);
                    }
                },
                error: (err) => { console.log(err)},
                complete: () => {}
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
}
