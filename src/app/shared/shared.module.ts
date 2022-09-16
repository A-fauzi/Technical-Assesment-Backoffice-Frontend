import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';
import {RouterModule} from "@angular/router";
import {AuthService} from "../auth/service/auth.service";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ValidationMessageComponent
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ValidationMessageComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SharedModule { }
