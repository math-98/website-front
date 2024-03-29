import { PortfolioPost } from './portfolio-post';

export class Skill {
  public id = 0;
  public name = '';
  public description = '';
  public iconUrl = '';
  public order = 0;

  public posts: Array<PortfolioPost>;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.iconUrl = data.icon_url;
    this.order = data.order;
  }
}
