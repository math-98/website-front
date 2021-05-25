import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import { LoaderComponent } from './shared/loader/loader.component';
import { HomeComponent } from './views/home/home.component';
import { TitleComponent } from './shared/title/title.component';
import { HomePortfolioComponent } from './views/home/home-portfolio/home-portfolio.component';
import { HomeSkillsComponent } from './views/home/home-skills/home-skills.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { PortfolioPostComponent } from './views/portfolio-post/portfolio-post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageHeadComponent } from './shared/page-head/page-head.component';
import { PasswordsComponent } from './views/passwords/passwords.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    TitleComponent,
    HomePortfolioComponent,
    HomeSkillsComponent,
    PortfolioPostComponent,
    PageHeadComponent,
    PasswordsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
