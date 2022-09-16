import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from "../models/employee.model";
import {Observable} from "rxjs";
import {EmployeeFieldModel} from "../models/employee.field.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

const EMPLOYEE_URL = '/';
@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {
  employee?: EmployeeModel
  id?: number
  subscribe?: Observable<any>
  field: typeof EmployeeFieldModel = EmployeeFieldModel

  employeeForm: FormGroup = new FormGroup({
    [EmployeeFieldModel.ID]: new FormControl(null),
    [EmployeeFieldModel.USERNAME]: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    [EmployeeFieldModel.FIRSTNAME]: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    [EmployeeFieldModel.LASTNAME]: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    [EmployeeFieldModel.EMAIL]: new FormControl(null, [Validators.required, Validators.email]),
    [EmployeeFieldModel.BIRTHDATE]: new FormControl(null, Validators.required),
    [EmployeeFieldModel.BASICSALARY]: new FormControl(null, Validators.required),
    [EmployeeFieldModel.STATUS]: new FormControl(null, Validators.required),
    [EmployeeFieldModel.GROUP]: new FormControl(null, Validators.required),
    [EmployeeFieldModel.DESCRIPTION]: new FormControl(null, Validators.required),
  })

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {

  }

  onSelectValueGroup(){

  }

  onSubmitEmployee() {
    Swal.fire({
      title: 'Are you sure?',
      text: "New Employee Will Be Added!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add!'
    }).then((result) => {
      if (result.isConfirmed) {
        const employee: EmployeeModel = this.employeeForm.value
        this.employeeService.save(employee).subscribe()
        console.log(employee)
        Swal.fire(
          `successfully added employee data ${employee.firstName} ${employee.lastName}!`,
          'New employees have been added.',
          'success',
        )
        this.employeeForm.reset()
        this.router.navigateByUrl(EMPLOYEE_URL)
      }
    })
  }

  isFieldValid(employeeField: EmployeeFieldModel): string {
    const control: AbstractControl = this.employeeForm.get(employeeField) as AbstractControl;
    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }

}
