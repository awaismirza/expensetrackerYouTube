import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../../auth/services/auth/auth.service';
import {Router} from '@angular/router';
import {AppRoutes} from '../../constants/constants';

@Component({
    selector: 'app-settings',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

    constructor(
        private storageService: StorageService,
        private alertController: AlertController,
        private authService: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    resetApp(): void {
        this.storageService.clearLocalStorage(true).then(() => {
            this.presentResetAlert(this.doLogout);
        });
    }


    async presentResetAlert(handler?: any) {
        const alert = await this.alertController.create({
            id: 'appResetAlert',
            header: 'App Reset Successful!',
            buttons: [{
                text: 'Go To Login',
                handler
            }],
        });
        await alert.present();
    }

    doLogout(): void {
        this.authService.logout().then(() => {
            this.router.navigateByUrl(AppRoutes.LOGIN);
            console.log('Reset Done Moving to Login Page');
        }, error => console.log(error));
    }
}
