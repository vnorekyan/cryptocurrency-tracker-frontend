import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//User components
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserService } from '../_services/user.service';
import { LogoutComponent } from './logout/logout.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    UserProfileComponent,
    LoginComponent,
    CreateUserComponent,
    EditProfileComponent,
    LogoutComponent
  ],
  exports: [
    UserProfileComponent,
    LoginComponent,
    CreateUserComponent,
    EditProfileComponent,
    LogoutComponent
  ],
  providers: [UserService]
})
export class UserModule { }
