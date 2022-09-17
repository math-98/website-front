import { Moment } from 'moment';
import * as moment from 'moment';
import { Skill } from './skill';
import { Link } from './link';

export class PortfolioPost {
  public id = 0;
  public slug = '';
  public title = '';
  public description = '';
  public text = '';
  public coverUrl = '';
  public starred = false;
  public statusColor = '';
  public statusText = '';
  public tags = [];
  public createdAt: Moment;
  public updatedAt: Moment;

  public languages: Array<Skill>;
  public links: Link[];

  constructor(data) {
    this.id = data.id;
    this.slug = data.slug;
    this.title = data.title;
    this.description = data.description;
    this.text = data.text;
    this.coverUrl = data.cover_url;
    this.starred = data.starred == 1;
    this.statusColor = data.status_color;
    this.statusText = data.status_text;
    this.tags = data.tags.map((elm) => elm.name);
    this.createdAt = moment(data.created_at);
    this.updatedAt = moment(data.updated_at);

    this.languages = [];
    if (data.languages !== undefined) {
      data.languages.forEach((language) => {
        this.languages.push(new Skill(language));
      });
    }

    this.links = [];
    if (data.links) {
      data.links.forEach((elm) => {
        this.links.push(new Link(elm));
      });
    }
  }

  public isMinified(): boolean {
    return this.text === undefined;
  }

  public static statusTextColor(bgColor: string): string {
    return ['warning', 'info', 'light'].includes(bgColor) ? 'dark' : 'light';
  }
}
