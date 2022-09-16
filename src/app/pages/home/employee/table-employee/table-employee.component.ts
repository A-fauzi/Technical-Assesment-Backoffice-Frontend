import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from "../models/employee.model";
import {EmployeeService} from "../service/employee.service";
import {Observer} from "rxjs";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-table-employee',
  templateUrl: './table-employee.component.html',
  styleUrls: ['./table-employee.component.scss']
})
export class TableEmployeeComponent implements OnInit {
  employees: EmployeeModel[] = []
  subscriber?: Observer<any>

  pageIndex: number = 0
  pageSize: number = 5
  lowValue: number = 0
  highValue: number = 5

  constructor(
    private readonly employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadDataEmployee()
  }

  loadDataEmployee(): void{
    this.subscriber = {
      next: (employees) => {
        this.employees = employees
        console.log(employees)
      },
      error: console.error,
      complete: () => {}
    }
    this.employeeService.list().subscribe(this.subscriber);
  }

  getEmployee(employee: EmployeeModel){
    this.employeeService.get(employee.id).subscribe()
    console.log(employee.id)
  }

  onDeleteEmployee(employee: EmployeeModel): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00FFAB',
      cancelButtonColor: '#FF4949',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          `Data Employee ${employee.firstName} ${employee.lastName} has been deleted.`,
          'success'
        );
        this.employeeService.remove(employee.id).subscribe();
      }
    });
  }

  getPaginateEmployee(event: any) {
    console.log(event)
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize
      this.highValue = this.highValue + this.pageSize
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize
      this.highValue = this.highValue - this.pageSize
    }
    this.pageIndex = event.pageIndex
  }

  searchText: string = ''

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue
    // console.log(this.searchText)
  }

  clickEdit() {
    Swal.fire({
      icon: 'info',
      text: 'Edit Employee',
      toast: true,
      showConfirmButton: false,
      position: 'top',
    })
  }
  clickDelete() {
    Swal.fire({
      icon: 'error',
      text: 'Delete Employee',
      toast: true,
      showConfirmButton: false,
      position: 'top',
    })
  }

}
