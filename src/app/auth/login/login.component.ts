import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import {LoginFieldModels} from "../models/login-field.models";
import {AuthService} from "../service/auth.service";
import {LoginToken} from "../models/login.models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  field: typeof LoginFieldModels = LoginFieldModels;
  showPassword: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  buildForm(): void {
    this.loginForm = new FormGroup({
      [LoginFieldModels.EMAIL]: new FormControl('', [Validators.required, Validators.email]),
      [LoginFieldModels.PASSWORD]: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const payload = this.loginForm.value;
    this.authService.login(payload).subscribe({
      next: (token: LoginToken | null) => {
        if (token) {
          this.handleLogin(token)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password salah',
          });
        }
      },
      error: (error) => console.error(error.message)
    })
  }

  private handleLogin(token: LoginToken): void {
    this.activatedRoute.queryParams
      .pipe(map((params) => params['next'] || null))
      .subscribe((next: string = '') => {
        this.router.navigateByUrl(next).finally();
      });
  }

  isFieldValid(loginField: LoginFieldModels): string {
    const control: AbstractControl = this.loginForm.get(loginField) as AbstractControl;
    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }

}
