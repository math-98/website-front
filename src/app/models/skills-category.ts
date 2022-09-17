import { Skill } from './skill';

export class SkillsCategory {
  public id = 0;
  public name = '';
  public order = 0;
  public skills: Skill[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.order = data.order;

    this.skills = [];
    data.skills.forEach((skill) => {
      this.skills.push(new Skill(skill));
    });
  }
}
