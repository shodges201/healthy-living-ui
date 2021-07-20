import { Injectable } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { ConfigService } from '../config/config.service';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { TokenResponse } from '@okta/okta-auth-js/lib/types/api';

@Injectable({
  providedIn: 'root'
})
export class OktaAuthService {

  private oktaAuth: OktaAuth;
  $isAuthenticated: Observable<boolean>;
  private observer?: Observer<boolean>;

  constructor(private configService: ConfigService, private router: Router) {
    const oktaService = this;
    this.oktaAuth = new OktaAuth({
      clientId: this.configService.getOktaClientId(),
      issuer: this.configService.getOktaIssuer(),
      redirectUri: `${this.configService.getBaseUrl()}/callback`,
      pkce: false,
      tokenManager: {
        expireEarlySeconds: 300,
        autoRenew: true
      },
    });

    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      oktaService.observer = observer;
      this.isAuthenticated().then(val => {
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.isAuthenticated());
  }

  login(originalUrl: string) {
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    this.oktaAuth.signInWithRedirect({
      originalUri: '/callback'
    });
  }

  async handleAuthentication() {
    try{
      console.log('getting callback response');
      const tokenContainer: TokenResponse = await this.oktaAuth.token.parseFromUrl();

      if(tokenContainer.tokens.accessToken){
        this.oktaAuth.tokenManager.add('accessToken', tokenContainer.tokens.accessToken);
      }

      if (await this.isAuthenticated() && this.observer) {
        this.observer.next(true);
      }

      // Retrieve the saved URL and navigate back
      const url = sessionStorage.getItem('okta-app-url') || '/';
      this.router.navigate(['/']);
    }
    catch(error){
      console.log(error);
    }
  }

  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: '/login'
    });
  }

}
