import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BudgetComponent} from './budget.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
      IonicModule,
      RouterModule.forChild([{path: '', component: BudgetComponent}])
  ]
})
export class BudgetModule { }
