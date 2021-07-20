import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from 'src/app/services/auth/okta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private okta: OktaAuthService, private router: Router) {}

  async ngOnInit() {
    // Gets response from Okta and sets token in token manager
    await this.okta.handleAuthentication();
  }

}
