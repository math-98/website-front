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
  public activeCategory = '';
  public postCategories: Array<string>;
  public posts: Array<PortfolioPost>;
  public fasStar = faStar;
  public fasExclamationCircle = faExclamationCircle;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.postCategories = undefined;
    this.posts = undefined;

    this.portfolioService
      .list()
      .then((posts) => {
        const postCategories: string[] = Array.from(
          new Set(posts.map((elm) => elm.tags).flat())
        );
        postCategories.sort((a, b) => {
          return a.localeCompare(b);
        });

        this.postCategories = postCategories;
        this.posts = posts;

        if (posts.length === 0) {
          console.error('No post returned by API.');
        }
      })
      .catch((err) => {
        console.error(err);
        this.postCategories = [];
        this.posts = [];
      });
  }

  isPostVisible(post: PortfolioPost): boolean {
    if (this.activeCategory === '') {
      return post.starred;
    }

    return post.tags.includes(this.activeCategory);
  }

  switchActiveCategory(category: string): void {
    this.activeCategory = category;
  }
}
