import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // obicni bool za prikaz registracijske stranice
  registerMode = false;
 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // ovdje radimo setovanje stranice za registraciju na on a home page na off
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  // ovdje radimo obratno tako sto mjenjano registerMode koji utice na HOME i registracijsku stranicu.
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
