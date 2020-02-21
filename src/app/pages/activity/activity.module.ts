import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityComponent} from './activity.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [ActivityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ActivityComponent}]),
    IonicModule
  ]
})
export class ActivityModule {
}