import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioPost } from '../models/portfolio-post';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private http: HttpClient;
  private posts: Array<PortfolioPost>;

  constructor(http: HttpClient) {
    this.http = http;
    this.posts = [];
  }

  public async list(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/v1/portfolio/list').subscribe(
        (data: Array<object>) => {
          this.posts = [];
          data.forEach((elm) => {
            this.posts.push(new PortfolioPost(elm));
          });

          resolve(this.posts);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public async get(slug): Promise<any> {
    return new Promise((resolve, reject) => {
      const index = this.posts.findIndex((elm) => elm.slug === slug);
      if (index >= 0) {
        if (!this.posts[index].isMinified()) {
          resolve(this.posts[index]);
        }
      }

      this.http.get('api/v1/portfolio/get/' + slug).subscribe(
        (data: object) => {
          const post = new PortfolioPost(data);
          if (index === undefined) {
            this.posts.push(post);
          } else {
            this.posts[index] = post;
          }

          resolve(post);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
