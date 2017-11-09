import { Component, OnInit } from '@angular/core';
import { TrackingService, AlertService } from '../../_services/index';
import { Tracking } from '../../_models/index';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-watchlist-dash',
  templateUrl: './watchlist-dash.component.html',
  styleUrls: ['./watchlist-dash.component.css']
})
export class WatchlistDashComponent implements OnInit {

  trackings: Tracking[];
  constructor(private alertService: AlertService, private trackingService: TrackingService, private router: Router) {

  }

  getTracking() {
    this.trackingService.getTracking()
      .subscribe(
      data => {
        console.log('tracking', data);
        this.trackings = data;
      },
      error => {
        this.alertService.error(error);
      });
  }



  ngOnInit() {
    console.log('here');
    this.getTracking();
  }

}
