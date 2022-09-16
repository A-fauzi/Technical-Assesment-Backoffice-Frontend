import {Injectable} from "@angular/core";
import {EmployeeModel} from "../models/employee.model";
import {SessionService} from "../../../../shared/service/session.service";
import {Observable, Observer} from "rxjs";
import {dataEmployee} from "../dummy-data/employee";

const EMPLOYEE_KEY = 'employee'

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  employees: EmployeeModel[] = []

  constructor(
    private readonly sessionService: SessionService
  ) {
  }

  private updateSessionStorage(): void {
    this.sessionService.set(EMPLOYEE_KEY, JSON.stringify(this.employees))
  }

  list(): Observable<EmployeeModel[]> {
    return new Observable<EmployeeModel[]>((observer: Observer<EmployeeModel[]>) => {
      try {
        const employeeValue: string = this.sessionService.get(EMPLOYEE_KEY)
        const employees: EmployeeModel[] = employeeValue ? JSON.parse(employeeValue) : dataEmployee
        this.employees = employees.reverse()
        this.updateSessionStorage()
        observer.next(employees)
      }catch (e: any) {
        observer.error(e.message)
      }
      observer.complete()
    })
  }

  remove(id: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        const employeeId: number = this.employees.findIndex(item => item.id === id)
        this.employees.splice(employeeId, 1)
        this.updateSessionStorage()
        observer.next()
      }catch (e: any) {
        observer.error(e.message)
      }
      observer.complete()
    })
  }

  save(employee: EmployeeModel): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (!employee.id) {
          employee.id = this.employees.length + 1
          this.employees.push(employee)
        } else {
          this.employees = this.employees.map((item) => {
            if (item.id === employee.id) {
              item = { ...item, ...employee}
            }
            return item
          })
        }
        this.updateSessionStorage()
        observer.next()
      }catch (e: any) {
        observer.error(e.message)
      }
      observer.complete
    })
  }

  get(id: number): Observable<EmployeeModel> {
    return new Observable<EmployeeModel>((observer: Observer<EmployeeModel>) => {
      try {
        const employee: EmployeeModel = this.employees.find((emp) => emp.id === id ) as EmployeeModel
        observer.next(employee)
      }catch (e: any) {
        observer.error(e.message)
      }
      observer.complete()
    })
  }

}
