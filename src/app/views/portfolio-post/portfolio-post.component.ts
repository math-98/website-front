import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PortfolioPost } from '../../models/portfolio-post';
import { PortfolioService } from '../../services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-portfolio-post',
  templateUrl: './portfolio-post.component.html',
  styleUrls: ['./portfolio-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioPostComponent implements OnInit {
  public post: PortfolioPost;
  private portfolioService: PortfolioService;
  private route: ActivatedRoute;
  private seoService: SeoService;

  constructor(
    portfolioService: PortfolioService,
    seoService: SeoService,
    route: ActivatedRoute
  ) {
    this.seoService = seoService;
    this.portfolioService = portfolioService;
    this.route = route;
  }

  ngOnInit(): void {
    let slug;
    this.route.params.subscribe((params) => {
      slug = params.slug;
    });

    this.portfolioService
      .get(slug)
      .then((post) => {
        this.post = post;

        if (post === undefined) {
          console.error('Post returned by API is undefined!');
        } else {
          this.seoService.setPageTitle(post.title);
          this.seoService.setDescription(post.description);
          this.seoService.setSocialImages(post.coverUrl);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
