import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser:User;
  photoUrl=new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changePlayerPhoto(photoUrl:string){
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((respone: any) => {
        const user = respone;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user',JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser =user.user;
          this.changePlayerPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}

// za koristenje potrebno je ubaciti servis u modul za koji zelimo da spojimo na api
// koristenjem this.authService.login(this.model).subscribe((
// saljemo modele iz forme prema apiju putem servis
//next) => {this.alertify.success('logged in successfully');}
//ovdje je callback u slucaju uspjeha
//,(error) => {this.alertify.error(error);});
//ovdje je callback u slucaju faila
