import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DevLanguage } from '../models/dev-language';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  private languages: object;

  constructor(private http: HttpClient) {}

  public async listLanguages(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/v1/dev-languages/list').subscribe(
        (data) => {
          this.languages = {};

          Object.entries(data).forEach(([key, languages]: [string, object[]]) => {
            const category = [];
            languages.forEach((language) => {
              category.push(new DevLanguage(language));
            });

            this.languages[key] = category;
          });

          resolve(this.languages);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
