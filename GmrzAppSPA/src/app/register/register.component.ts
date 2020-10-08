import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // saljemo povratnu informaciju parrent modulu HOME da ugasimo prozor registracije
  @Output() cancelRegister = new EventEmitter();

  //model koji prima objekat sa usernamom i pw i dodatnim
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('Registracija was a success!');
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
// emitujemo false bool da bi promjenili u HOME modulu prikaz registracijske stranice
  cancel() {
    this.cancelRegister.emit(false);
  }
}
