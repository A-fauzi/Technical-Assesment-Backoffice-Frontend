import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule} from "./pages.routing.module";
import {ToastrModule} from "ngx-toastr";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ToastrModule.forRoot()
  ]
})
export class PagesModule { }
