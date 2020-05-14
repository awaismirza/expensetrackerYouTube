import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, of, scheduled, throwError} from 'rxjs';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/internal-compatibility';
import {LodashService} from '../../../services/lodash/lodash.service';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    private userCredentials: BehaviorSubject<UserCredential>;

    constructor(
        private fireAuth: AngularFireAuth,
        private _: LodashService,
    ) {
        this.userCredentials = new BehaviorSubject<UserCredential>(null);
    }


    async getCurrentUserStatus() {
        return await this.fireAuth.authState.toPromise();
    }

    getUserCredentials(): UserCredential {
        return this.userCredentials.getValue();
    }

    setUserCredentials(userCredentials: UserCredential): void {
        this.userCredentials.next(userCredentials);
    }

    getUserCredentialSubscription(): BehaviorSubject<UserCredential> {
        return this.userCredentials;
    }

    async loginWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        if (!this._.isNull(email) && !this._.isNull(password)) {
            return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
        }
    }


    // RegisterWithEmailAndPassword
    async registerWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        if (!this._.isNull(email) && !this._.isNull(password)) {
            return await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
        }
    }

    // Logout
    async logout(): Promise<void> {
        return await this.fireAuth.auth.signOut();
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
