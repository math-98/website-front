import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentDate = new Date();
  private router: Router;
  private activatedRoute: ActivatedRoute;
  private seoService: SeoService;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    seoService: SeoService
  ) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.seoService = seoService;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.seoService.reset();

        this.seoService.setPageTitle(event.title);
        if (event.description) {
          this.seoService.setDescription(event.description);
        }
        this.seoService.setTag('og:url', this.router.url);

        if (event.social_image) {
          this.seoService.setSocialImages(event.social_image);
        }
        if (event.social_image_alt) {
          this.seoService.setTag('og:image:alt', event.social_image_alt);
        }
      });
  }
}
