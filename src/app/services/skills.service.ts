import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SkillsCategory } from '../models/skills-category';
import { PortfolioService } from './portfolio.service';
import { PortfolioPost } from '../models/portfolio-post';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skills: Array<object>;

  constructor(
    private http: HttpClient,
    private portfolioService: PortfolioService
  ) {}

  public async list(): Promise<any> {
    let posts: PortfolioPost[] = await this.portfolioService.list();

    return new Promise((resolve, reject) => {
      this.http.get('skills').subscribe({
        next: (data: Array<object>) => {
          this.skills = [];
          data.forEach((skillsCategory: object) => {
            this.skills.push(new SkillsCategory(skillsCategory));

            this.skills.forEach((skillsCategory: SkillsCategory) => {
              skillsCategory.skills.forEach((skill) => {
                skill.posts = posts.filter((post) => {
                  return post.skills.some((postSkill) => {
                    return postSkill.id == skill.id;
                  });
                });
              });
            });
          });

          resolve(this.skills);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
