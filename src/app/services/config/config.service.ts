import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  getConfig() {
    return environment;
  }

  getBaseUrl(){
    return environment.API_BASE_URL; 
  }

  getBaseApiUrl(){
    return environment.API_BASE_URL + environment.API_PREFIX;
  }

  getHdlBaseUrl(){
    return this.getBaseApiUrl() + '/hdl';
  }

  getLdlBaseUrl(){
    return this.getBaseApiUrl() + '/ldl';
  }

  getHeartRateBaseUrl(){
    return this.getBaseApiUrl() + '/heart-rate';
  }

  getOktaDomain(){
    return environment.OKTA_BASE_URL;
  }

  getOktaClientId(){
    return environment.OKTA_CLIENT_ID;
  }

  getOktaIssuer(){
    return environment.OKTA_ISSUER
  }
}
