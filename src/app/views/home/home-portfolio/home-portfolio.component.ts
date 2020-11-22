import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../../services/portfolio.service';
import { PortfolioPost } from '../../../models/portfolio-post';
import { faExclamationCircle, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-portfolio',
  templateUrl: './home-portfolio.component.html',
  styleUrls: ['./home-portfolio.component.scss'],
})
export class HomePortfolioComponent implements OnInit {
  public posts: Array<PortfolioPost>;
  private portfolioService: PortfolioService;
  public fasStar = faStar;
  public fasExclamationCircle = faExclamationCircle;

  constructor(portfolioService: PortfolioService) {
    this.portfolioService = portfolioService;
  }

  ngOnInit(): void {
    this.posts = undefined;
    this.portfolioService
      .list()
      .then((posts) => {
        this.posts = posts;

        if (posts.length === 0) {
          console.error('No post returned by API.');
        }
      })
      .catch((err) => {
        console.log(err);
        this.posts = [];
      });
  }
}
