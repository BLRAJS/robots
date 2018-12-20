import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  login(userName: string, password: string): void {

    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    
    localStorage.setItem("token",this.currentUser['userName']+""+this.currentUser['isAdmin'])

  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
