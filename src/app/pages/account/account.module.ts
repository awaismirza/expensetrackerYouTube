import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountComponent} from './account.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AccountComponent}]),
    IonicModule
  ]
})
export class AccountModule { }
