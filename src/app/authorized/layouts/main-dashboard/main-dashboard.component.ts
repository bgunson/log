import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Log } from 'src/app/models/log.model';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {

  @Input() sL: Log;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 3, rows: 1 },
          { title: 'Card 3', cols: 3, rows: 1 },
          { title: 'Card 4', cols: 3, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 3, rows: 1 },
        { title: 'Card 3', cols: 3, rows: 2 },
        { title: 'Card 4', cols: 3, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
    
  }
}
