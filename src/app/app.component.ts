import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoService } from './services/seo.service';
import { faBars, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentDate = new Date();
  public fasBars = faBars;
  public fabGithub = faGithub;
  public fasChevronUp = faChevronUp;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        map(() => this.activatedRoute),
        map((route: ActivatedRoute) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((event) => {
        this.seoService.reset();

        this.seoService.setPageTitle(event.title);
        if (event.description) {
          this.seoService.setDescription(event.description);
        }
        this.seoService.setTag('og:url', location.origin + this.router.url);

        if (event.social_image) {
          this.seoService.setSocialImages(event.social_image);
        }
        if (event.social_image_alt) {
          this.seoService.setTag('og:image:alt', event.social_image_alt);
        }
      });
  }
}
