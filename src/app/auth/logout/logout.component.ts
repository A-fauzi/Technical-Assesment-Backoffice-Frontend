import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../shared/service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.sessionService.remove('token')
    this.router.navigateByUrl('/login')
  }

}
