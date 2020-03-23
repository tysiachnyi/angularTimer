import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {TimerService} from './timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private timer: boolean;
  private currentCount;
  private timeLeft: any = 0;
  private subscribeTimer: number | string = this.timeLeft;
  @ViewChild('timerInput', {static: false}) timerInput: ElementRef;

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.subscribeTimer = this.timerService.convertSeconds(this.timerService.timeLeft);
  }

  startTimer() {
    this.timerService.start(this.timeLeft);
    // this.source$ = timer(0, 1000);
    // this.currentCount = this.source$.subscribe(val => {
    //   console.log(val, '-');
    //   this.subscribeTimer = this.convertSeconds(this.timeLeft - val);
    // });
  }

  stopTimer() {
    this.timerService.stop();
  }


  toTimer() {
    const a = this.timerInput.nativeElement.value.split(':');
    let h;
    let m;
    let s;
    for (let i = 0; i < a.length; ++i) {
      if (i === 0 ) {
        h = (+a[i] * 3600);
      }
      if (i === 1) {
        m = (+a[i] * 60);
      }
      if (i === 2) {
        s = (+a[i]);
      }
    }

    this.timeLeft = (h + m) + s;
    this.timerService.subscribeTimer = this.timerService.convertSeconds(this.timeLeft);
    // const a = this.timeLeft.split(':');
    // this.timeLeft = (+a[0]) * 60 * 60 + (+a[1]);
    // console.log(this.timeLeft);

  }

  waitTimer() {

  }


  resetTimer() {
    this.timeLeft = 0;
    this.timerService.subscribeTimer = this.timerService.convertSeconds(this.timeLeft);
    this.timerService.stop();
  }
}
