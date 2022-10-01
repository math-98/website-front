import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './shared/loader/loader.component';
import { HomeComponent } from './views/home/home.component';
import { TitleComponent } from './shared/title/title.component';
import { HomePortfolioComponent } from './views/home/home-portfolio/home-portfolio.component';
import { HomeSkillsComponent } from './views/home/home-skills/home-skills.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { PortfolioPostComponent } from './views/portfolio-post/portfolio-post.component';
import { PageHeadComponent } from './shared/page-head/page-head.component';
import { PasswordsComponent } from './views/passwords/passwords.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePortfolioItemComponent } from './views/home/home-portfolio-item/home-portfolio-item.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeSkillModalComponent } from './views/home/home-skill-modal/home-skill-modal.component';

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
    HomePortfolioItemComponent,
    HomeSkillModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot(),
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
