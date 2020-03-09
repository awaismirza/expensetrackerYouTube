import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from "@angular/forms";
import {CatagoryPipe} from "../../pipes/catagory.pipe";


@NgModule({
    declarations: [DashboardComponent, CatagoryPipe],
	imports: [
		CommonModule,
		RouterModule.forChild([{path: '', component: DashboardComponent}]),
		IonicModule,
		SharedModule,
		FormsModule
	]
})
export class DashboardModule {
}
