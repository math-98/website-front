export class Skill {
  public id = 0;
  public name = '';
  public description = '';
  public iconUrl = '';
  public order = 0;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.iconUrl = data.icon_url;
    this.order = data.order;
  }
}
