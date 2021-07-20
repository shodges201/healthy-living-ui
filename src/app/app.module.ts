import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/pages/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { CallbackComponent } from './components/pages/callback/callback.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/pages/home/home.component';
import { CholesterolComponent } from './components/pages/cholesterol/cholesterol.component';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const authConfig = {
  domain: 'dev-jpptb4cy.us.auth0.com',
  clientId: 'A0zbhg5HxFKccXOk6lcEUpJgQwCNl2eA',
  httpInterceptor: {
    allowedList: [
      `${environment.API_BASE_URL}/api/*`
    ]}
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    CallbackComponent,
    HomeComponent,
    CholesterolComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AuthModule.forRoot(authConfig),
    HttpClientModule,
    MaterialModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
