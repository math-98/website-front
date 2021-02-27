import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
        filter((event) => {
          return event instanceof NavigationEnd;
        }),
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
        this.seoService.update(event, event.analytics);
      });
  }
}
