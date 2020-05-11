import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, of, scheduled, throwError} from 'rxjs';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/internal-compatibility';
import {LodashService} from '../../../services/lodash/lodash.service';
import {mergeMap} from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService implements OnInit {

    private readonly activeUserStatus: BehaviorSubject<boolean>;
    private readonly userCredentials: BehaviorSubject<UserCredential>;

    constructor(
        private fireAuth: AngularFireAuth,
        private _: LodashService,
    ) {
        this.activeUserStatus = new BehaviorSubject<any>(null);
        this.userCredentials = new BehaviorSubject<UserCredential>(null);
    }

    getUserCredentials(): UserCredential {
        return this.userCredentials.getValue();
    }

    setUserCredentials(userCredentials: UserCredential): Observable<void> {
        return of(this.userCredentials.next(userCredentials));
    }

    getUserCredentialSubscription(): BehaviorSubject<UserCredential> {
        return this.userCredentials;
    }

    getActiveUserStatus(): boolean {
        return this.activeUserStatus.getValue();
    }

    setActiveUserStatus(status: boolean): Observable<void> {
        return of(this.activeUserStatus.next(status));
    }

    getActiveUserSubscription(): BehaviorSubject<boolean> {
        return this.activeUserStatus;
    }

    // loginWithEmailAndPassword
    loginWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
        if (!this._.isNull(email) && !this._.isNull(password)) {
             return fromPromise(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
        } else {
            return throwError('Email Or Password is Null');
        }
    }


    // RegisterWithEmailAndPassword
    registerWithEmailAndPassword(email: string, password: string): Observable<firebase.auth.UserCredential> {
        if (!this._.isNull(email) && !this._.isNull(password)) {
            return fromPromise(this.fireAuth.auth.createUserWithEmailAndPassword(email, password));
        } else {
            throwError('Pass Correct Email and Password');
        }
    }

    // Logout
    logout(): Observable<void> {
        return fromPromise(this.fireAuth.auth.signOut());
    }

    ngOnInit(): void {
        this.fireAuth.auth.currentUser.getIdTokenResult().then((token) => {
            console.log(token);
            // if(token !== null) {
            //     this.activeUserStatus.next(true)
            // }
        });
    }

}
