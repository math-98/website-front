import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-home-skill-modal',
  templateUrl: './home-skill-modal.component.html',
  styleUrls: ['./home-skill-modal.component.scss'],
})
export class HomeSkillModalComponent {
  skill: Skill;

  constructor(public bsModalRef: BsModalRef) {}
}
