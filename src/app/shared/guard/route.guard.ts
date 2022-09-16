import {Injectable} from "@angular/core";
import Swal from 'sweetalert2';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, Params,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {SessionService} from "../service/session.service";

@Injectable({
  providedIn: "root"
})
export class RouteGuard implements CanActivate, CanActivateChild{
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router,
  ) {
  }

  // method redirect to login if not authorize
  protected redirectToLogin(queryParams?: Params): void{
    this.router.navigate(['', 'login'], {queryParams}).finally()
  }

  private authorize(state: RouterStateSnapshot): boolean{
    const params: Params = {next: state.url}
    const authorize: boolean = (this.sessionService.get('token') !== null)
    if (!authorize){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Silahkan Login untuk masuk',
      });
      this.redirectToLogin(params)
    }
    const menus = [
      {
        id: 1,
        name: 'home',
        location: ''
      },
      // {
      //   id: 2,
      //   name: 'add',
      //   location: 'add'
      // },

    ]
    return menus.some(m => {
      return state.url.indexOf(m.location) > -1
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize(state)
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize(state)
  }

}
