import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioPost } from '../models/portfolio-post';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private listPromise: Promise<any>;
  private posts: Array<PortfolioPost>;

  constructor(private http: HttpClient) {
    this.posts = [];
  }

  public async list(): Promise<any> {
    if (!this.listPromise) {
      this.listPromise = new Promise((resolve, reject) => {
        if (this.posts.length) {
          resolve(this.posts);
          return;
        }

        this.http.get('posts').subscribe({
          next: (data: Array<object>) => {
            this.posts = [];
            data.forEach((elm) => {
              this.posts.push(new PortfolioPost(elm));
            });

            resolve(this.posts);
          },
          error: (err) => {
            reject(err);
          },
        });
      });
    }
    return this.listPromise;
  }

  public async get(slug): Promise<any> {
    return new Promise((resolve, reject) => {
      const index = this.posts.findIndex((elm) => elm.slug === slug);
      if (index >= 0) {
        if (!this.posts[index].isMinified()) {
          resolve(this.posts[index]);
        }
      }

      this.http.get('posts/' + slug).subscribe({
        next: (data: object) => {
          const post = new PortfolioPost(data);
          if (index === undefined) {
            this.posts.push(post);
          } else {
            this.posts[index] = post;
          }

          resolve(post);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
