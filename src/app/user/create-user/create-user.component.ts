import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../_services/index';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../../_models/index';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  model: any = {};
  constructor(private alertService: AlertService, private userService: UserService, private router: Router) { }

  signup() {
    console.log(this.model,'model');
    this.userService.create(this.model)
      .subscribe(
      data => {
        data = JSON.parse(JSON.stringify(data || null));
        console.log(data);
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.router.navigate(['/user-profile']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  ngOnInit() {
  }

}
