import {Component,  OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})

export class TimerComponent implements OnInit{
  time: number = 0;
  ngOnInit(): void {

  }
}


