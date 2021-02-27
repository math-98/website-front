import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PortfolioPostComponent } from './views/portfolio-post/portfolio-post.component';

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
    path: 'portfolio/:slug',
    component: PortfolioPostComponent,
    data: {
      title: 'Portfolio',
      description: '',
      analytics: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
