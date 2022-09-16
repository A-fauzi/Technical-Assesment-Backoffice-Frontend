import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {RouteGuard} from "../../shared/guard/route.guard";
import {FormEmployeeComponent} from "./employee/form-employee/form-employee.component";
import {DetailEmployeeComponent} from "./employee/detail-employee/detail-employee.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: HomeComponent
  },
  {
    path: 'form',
    canActivate: [RouteGuard],
    component: FormEmployeeComponent
  },
  {
    path: 'employee/:id',
    canActivate: [RouteGuard],
    component: DetailEmployeeComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
