export interface User {
  uid: string;
  email: string;
  displayName: string;
}

export abstract class AuthService {
  abstract isAuth(): boolean;
  abstract isAdmin(): boolean;
  abstract getUSer(): User;
  abstract login(loginMethod: string);
  abstract logout();
}
