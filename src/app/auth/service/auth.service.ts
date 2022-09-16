import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { SessionService } from "src/app/shared/service/session.service";
import {LoginModels, LoginToken} from "../models/login.models";

const AUTH_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly sessionService: SessionService) { }

  login(payload: LoginModels): Observable<LoginToken | null> {
    return new Observable<LoginToken | null>((observer: Observer<LoginToken | null>) => {
      try {
        const { email, password } = payload;
        if (email === 'admin@gmail.com' && password === 'password') {
          const token: LoginToken = { token: '12345' };
          this.sessionService.set(AUTH_KEY, JSON.stringify(token));
          observer.next(token);
        } else {
          observer.next(null);
        }
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    })
  }
}
