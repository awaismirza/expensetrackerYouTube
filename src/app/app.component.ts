import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {StorageService} from "./services/storage/storage.service";
import {StorageKeys} from "./constants/constants";
import {DatetimeService} from "./services/datetime/datetime.service";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private storageService: StorageService,
		private datetimeService: DatetimeService,
	) {
		this.initializeApp().then(() => {
			this.initializeInstallDate();
		})
	}

	async initializeApp(): Promise<void> {
		return await this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	initializeInstallDate(): void {
		this.storageService.getFromLocalStorage(StorageKeys.INSTALL_DATE).then((val) => {
			if (val) {
				this.datetimeService.installDate = val;
			} else {
				this.storageService.saveToLocalStorage(StorageKeys.INSTALL_DATE, this.datetimeService.getCurrentDateTime());
			}
		});
	}
}
