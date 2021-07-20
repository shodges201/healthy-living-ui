import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public isAuthenticated = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(loggedIn => this.isAuthenticated = loggedIn);
  }

  logout(): void {
    this.authService.logout({ returnTo: 'http://localhost:4200' });
  }

}
