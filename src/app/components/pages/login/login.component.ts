import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public isAuthenticated = false;

  constructor(private configService: ConfigService, public authService: AuthService) { 
  }

  logout(): void {
    this.authService.logout({ returnTo: 'http://localhost:4200' });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(loggedIn => {
      console.log("logged in: " + loggedIn);
      this.isAuthenticated = loggedIn
    });
  }
}
