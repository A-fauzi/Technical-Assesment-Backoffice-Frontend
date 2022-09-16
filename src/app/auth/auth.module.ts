import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth.routing.module";
import {AuthService} from "./service/auth.service";



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  // To get token, include this  AuthService in providers
  providers: [AuthService]
})
export class AuthModule { }
