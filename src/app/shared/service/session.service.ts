import {Injectable} from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class SessionService {
  private readonly storage: Storage = sessionStorage

  // get token session
  get(key: string): string{
    return this.storage.getItem(key) as string
  }

  // set token session
  set(key: string, value: string): void{
    return this.storage.setItem(key, value)
  }

  // remove token session
  remove(key: string): void{
    return this.storage.removeItem(key)
  }
}
