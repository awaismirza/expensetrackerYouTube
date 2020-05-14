import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {StorageService} from './services/storage/storage.service';
import {AppRoutes, StorageKeys} from './constants/constants';
import {DatetimeService} from './services/datetime/datetime.service';
import {KeyboardResize, Plugins} from '@capacitor/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private storageService: StorageService,
        private datetimeService: DatetimeService,
        private fireAuth: AngularFireAuth,
        private router: Router,
    ) {
        this.initializeApp().then(() => {
            this.initializeInstallDate();
        });
    }

    async initializeApp(): Promise<void> {
        return await this.platform.ready().then(() => {
            this.fireAuth.auth.onAuthStateChanged((user) => {
                user !== null
                    ? this.storageService.saveToLocalStorage(StorageKeys.ACTIVE_USER, true)
                    : this.storageService.saveToLocalStorage(StorageKeys.ACTIVE_USER, false);
                this.router.navigateByUrl(AppRoutes.TABS)
                    .then((bool) => {
                        return Plugins.Device.getInfo();
                    })
                    .then((deviceInfo) => {
                        deviceInfo.platform !== 'web'
                            ? Plugins.SplashScreen.hide()
                            : Plugins.StatusBar.show();
                    });
            });
        });
    }

    initializeInstallDate(): void {
        this.storageService.getFromLocalStorage(StorageKeys.INSTALL_DATE)
            .then(
                (val) => {
                    val ? this.datetimeService.installDate = val
                        : this.storageService.saveToLocalStorage(StorageKeys.INSTALL_DATE, this.datetimeService.getCurrentDateTime());
                });
    }
}
