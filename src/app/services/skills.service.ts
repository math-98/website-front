import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SkillsCategory } from '../models/skills-category';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skills: Array<object>;

  constructor(private http: HttpClient) {}

  public async list(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('skills').subscribe({
        next: (data: Array<object>) => {
          this.skills = [];
          data.forEach((skillsCategory: object) => {
            this.skills.push(new SkillsCategory(skillsCategory));
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
