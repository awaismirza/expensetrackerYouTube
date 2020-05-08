import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, throwError} from 'rxjs';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/internal-compatibility';
import {LodashService} from '../../../services/lodash/lodash.service';

@Injectable()
export class AuthService {

    constructor(
        private fireAuth: AngularFireAuth,
        private _: LodashService,
    ) {
    }

    // loginWithEmailAndPassword
    loginWithEmailAndPassword(email: string, password: string): Observable<firebase.auth.UserCredential | void> {
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

    //LoginWithGoogle

}
