import { Moment } from 'moment';
import * as moment from 'moment';
import { DevLanguage } from './dev-language';

export class PortfolioPost {
  public id = 0;
  public slug = '';
  public title = '';
  public description = '';
  public text = '';
  public coverUrl = '';
  public wip = false;
  public ordering = 0;
  public createdAt: Moment;
  public updatedAt: Moment;

  public languages: Array<DevLanguage>;

  constructor(data) {
    this.id = data.id;
    this.slug = data.slug;
    this.title = data.title;
    this.description = data.description;
    this.text = data.text;
    this.coverUrl = data.cover_url;
    this.wip = data.wip;
    this.ordering = data.ordering;
    this.createdAt = moment(data.created_at);
    this.updatedAt = moment(data.updated_at);

    this.languages = [];
    if (data.languages !== undefined) {
      data.languages.forEach((language) => {
        this.languages.push(new DevLanguage(language));
      });
    }
  }

  public isMinified(): boolean {
    return this.text === undefined;
  }
}
