import {Injectable, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Injectable({providedIn: 'root'})

export class TimerService {
    sub: Subscription;
    intervalStream$;
    subscribeTimer: any;
    timeLeft: any = 0;
    currentTime: any;
    constructor() {
        this.subscribeTimer = this.convertSeconds(this.timeLeft);
    }

    start(timeLeft: number) {
        this.intervalStream$ = interval(1000);
        this.sub = this.intervalStream$.subscribe((value) => {
            console.log(value);
            this.subscribeTimer = this.convertSeconds(timeLeft - value);
            this.currentTime = timeLeft - value;
        });
    }

    convertSeconds = (s) => {
        const hrs: number|string = Math.floor(s / (60 * 60));
        const divisorForMinutes = s % (60 * 60);
        const min: number|string = Math.floor(divisorForMinutes / 60);
        const divisorForSeconds = divisorForMinutes % 60;
        const sec: number|string = Math.ceil(divisorForSeconds);
        return hrs + ' : ' + min + ' : ' + sec;
    }

    stop() {
        this.sub.unsubscribe();
        this.timeLeft = this.currentTime;
    }
}


