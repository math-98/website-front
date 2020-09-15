import { Moment } from 'moment';
import * as moment from 'moment';

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
  }

  public isMinified(): boolean {
    return this.text === undefined;
  }
}
