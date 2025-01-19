import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: UserInterface[] = [
    { username: 'ines@.com', password: 'password123' }
  ];
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.users.find(
        user => user.username === username && user.password === password
    );
    if (user) {
      this.currentUserSubject.next(user.username);
      return true;
    }
    return false;
  }
}
