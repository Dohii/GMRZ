import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  //Objekt modela koji prima username i password iz forme ili jos dodatnih informacija
  model: any = {};
  viewModeDL = true;
  photoUrl:string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photoUrl=>this.photoUrl = photoUrl);
  }
//dark light mode helper za dugmad
  viewModeDLToggle(mode:boolean) {
    this.viewModeDL = mode;
  }
//mjenjanje u runtimeu teme da li je dark ili ne
  setTheme(theme: string) {
    window['switchStyle'](theme);
    localStorage.setItem('myapp-theme', theme); // isti key kao u i local storage style i 'style-switcher.js'
  }
// ovdje te logujemo
  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('logged in successfully');
      },
      (error) => {
        this.alertify.error(error);
      }, () =>{
        this.router.navigate(['/players'])
      }
    );
  }
  // ovdje chekujemo da li je user logovan tako sto gledamo da li ima token
  loggedIn() {
    return this.authService.loggedIn();
  }
  // ovdje brisemo token da bi smo odlogovali usera
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
