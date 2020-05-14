import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree, Router
} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {AppRoutes, StorageKeys} from '../../../constants/constants';
import {AngularFireAuth} from '@angular/fire/auth';
import {switchMap} from 'rxjs/operators';
import {StorageService} from '../../../services/storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.storageService.getFromLocalStorage(StorageKeys.ACTIVE_USER).then((response) => {
            if (response !== null && response === true) {
                return true;
            } else {
                this.router.navigateByUrl(AppRoutes.AUTH);
            }
        });

    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }
}
