import { Moment } from 'moment';
import * as moment from 'moment';

export class DevLanguage {
  public id = 0;
  public name = '';
  public iconUrl = '';
  public ordering = 0;
  public createdAt: Moment;
  public updatedAt: Moment;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.iconUrl = data.icon_url;
    this.ordering = data.ordering;
    this.createdAt = moment(data.created_at);
    this.updatedAt = moment(data.updated_at);
  }
}
