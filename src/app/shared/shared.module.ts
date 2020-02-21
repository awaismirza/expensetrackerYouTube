import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddExpenseComponent} from './components/add-expense/add-expense.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [AddExpenseComponent],
  imports: [
    CommonModule,
      IonicModule
  ],
  entryComponents: [
      AddExpenseComponent
  ]
})
export class SharedModule { }
