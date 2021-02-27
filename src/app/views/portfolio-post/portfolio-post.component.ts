import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PortfolioPost } from '../../models/portfolio-post';
import { PortfolioService } from '../../services/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolio-post',
  templateUrl: './portfolio-post.component.html',
  styleUrls: ['./portfolio-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioPostComponent implements OnInit {
  public post: PortfolioPost;
  public fasTools = faTools;

  constructor(
    private portfolioService: PortfolioService,
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

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
          this.seoService.update({
            title: post.title,
            description: post.description,
            image_url: post.coverUrl,
            image_alt: post.title + '" cover',
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
