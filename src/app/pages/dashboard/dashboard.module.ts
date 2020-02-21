import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: DashboardComponent}]),
        IonicModule,
        SharedModule
    ]
})
export class DashboardModule {
}
