import { Component, OnInit } from '@angular/core';
import { TrackingService, AlertService } from '../../_services/index';
import { Tracking } from '../../_models/index';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  trackings: any[];
  constructor(private alertService: AlertService, private trackingService: TrackingService, private router: Router) {

  }

  getTracking() {
    this.trackingService.getTracking()
      .subscribe(
      data => {
        console.log(data);
        this.trackings = data;
        this.getCryptoDataTracking();
      },
      error => {
        this.alertService.error(error);
      });
  }

  untrackCrypto(id) {
    console.log(id);
    this.trackingService.deleteTracking(id)
      .subscribe(
      data => {
        console.log(data);
        setTimeout(() => {
          console.log('refresh')
          this.refresh();
          this.router.navigate(['/user/tracking']);
        }, 100);
      },
      error => {
        this.alertService.error(error);
      });
  }

  refresh(): void {
    window.location.reload();
  }

  getStreamData() {
    this.trackings.forEach(tracking => {
      console.log('tracking', tracking);
    })
  }

  getCryptoDataTracking() {
    this.trackings = this.trackingService.getCryptoDataForTracking(this.trackings);
    setTimeout(() => {
      this.getStreamData();
    }, 1000);
  }

  ngOnInit() {
    this.getTracking();
  }

}
