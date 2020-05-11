import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {FirebaseAuth} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private authService: AuthService,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const val = this.authService.getActiveUserStatus();
        console.log(val);
        return this.authService.getActiveUserStatus();
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
