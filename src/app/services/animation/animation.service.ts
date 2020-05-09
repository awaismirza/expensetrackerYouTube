import {Injectable} from '@angular/core';
import {AnimationController} from '@ionic/angular';
import {from, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AnimationService {

    constructor(
        private animationCtrl: AnimationController,
    ) {}

    transformAnimationOnY = (element: string, duration: number = 500, startY: string, endY: string): Observable<any> => {
        return of(this.animationCtrl.create()
            .addElement(document.querySelector(element))
            .duration(duration)
            .fromTo('transform', `translateY(${startY}px)`, `translateY(${endY}px)`));
    }
}
