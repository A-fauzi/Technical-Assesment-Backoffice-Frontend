import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {TableEmployeeComponent} from './employee/table-employee/table-employee.component';
import {HeaderPagesComponent} from './header-pages/header-pages.component';
import {HomeRoutingModule} from "./home.routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormEmployeeComponent} from "./employee/form-employee/form-employee.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetailEmployeeComponent} from "./employee/detail-employee/detail-employee.component";
import {SearchEmployeeComponent} from "./search-employee/search-employee.component";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    HomeComponent,
    TableEmployeeComponent,
    HeaderPagesComponent,
    FormEmployeeComponent,
    DetailEmployeeComponent,
    SearchEmployeeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class HomeModule {
}
