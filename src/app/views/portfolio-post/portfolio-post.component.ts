import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PortfolioPost } from '../../models/portfolio-post';
import { PortfolioService } from '../../services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-portfolio-post',
  templateUrl: './portfolio-post.component.html',
  styleUrls: ['./portfolio-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioPostComponent implements OnInit {
  public post: PortfolioPost;
  public badgeTextColor: string;

  constructor(
    private portfolioService: PortfolioService,
    private seoService: SeoService,
    private route: ActivatedRoute,
    private library: FaIconLibrary
  ) {
    this.library.addIconPacks(fas, far, fab);
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
        this.badgeTextColor = PortfolioPost.statusTextColor(
          this.post.statusColor
        );

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
