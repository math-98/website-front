import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PortfolioPostComponent } from './views/portfolio-post/portfolio-post.component';
import { PasswordsComponent } from './views/passwords/passwords.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Accueil',
      description: '',
    },
  },
  {
    path: 'passwords',
    component: PasswordsComponent,
    data: {
      title: 'Chiffrer un mot de passe',
      description: '',
    },
  },
  {
    path: 'portfolio/:slug',
    component: PortfolioPostComponent,
    data: {
      title: 'Portfolio',
      description: '',
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 52],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
