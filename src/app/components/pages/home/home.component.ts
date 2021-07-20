import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isAuthenticated = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(loggedIn => {
      console.log("logged in: " + loggedIn);
      this.isAuthenticated = loggedIn
    });
  }

}
