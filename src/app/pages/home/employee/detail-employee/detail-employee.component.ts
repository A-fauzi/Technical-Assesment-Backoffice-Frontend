import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from "../models/employee.model";
import {map, Observable} from "rxjs";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {
  employee: EmployeeModel | undefined
  id: number | undefined
  subscriber: Observable<any> | undefined

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployee()
  }

  getEmployee(): void {
    const id  = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.employeeService.get(id).subscribe(employee => this.employee = employee)
  }

}
