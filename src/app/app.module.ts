import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import { LoaderComponent } from './shared/loader/loader.component';
import { HomeComponent } from './views/home/home.component';
import { TitleComponent } from './shared/title/title.component';
import { HomePortfolioComponent } from './views/home/home-portfolio/home-portfolio.component';
import { HomeSkillsComponent } from './views/home/home-skills/home-skills.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    TitleComponent,
    HomePortfolioComponent,
    HomeSkillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
