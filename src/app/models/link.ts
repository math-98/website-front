export class Link {
  public id = 0;
  public name = '';
  public url = '';
  public icon = [];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.url = data.url;

    this.icon = data.icon.split(' ');
    this.icon[1] = this.icon[1].substring(3);
  }
}
