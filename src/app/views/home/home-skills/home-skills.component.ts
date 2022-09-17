import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../services/skills.service';
import { faCog, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { SkillsCategory } from '../../../models/skills-category';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { HomeSkillModalComponent } from '../home-skill-modal/home-skill-modal.component';
import { Skill } from '../../../models/skill';

@Component({
  selector: 'app-home-skills',
  templateUrl: './home-skills.component.html',
  styleUrls: ['./home-skills.component.scss'],
})
export class HomeSkillsComponent implements OnInit {
  public skills: Array<SkillsCategory>;
  public fasCog = faCog;
  public fasExclamationCircle = faExclamationCircle;

  bsModalRef?: BsModalRef;

  constructor(
    private skillsService: SkillsService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.skills = undefined;
    this.skillsService
      .list()
      .then((skills) => {
        this.skills = skills;

        if (skills.length === 0) {
          console.error('No skill returned by API!');
        }
      })
      .catch((err) => {
        console.error(err);
        this.skills = [];
      });
  }

  openSkillModal(skill: Skill) {
    const initialState: ModalOptions = {
      initialState: {
        skill,
      },
    };
    this.bsModalRef = this.modalService.show(
      HomeSkillModalComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Fermer';

    return false;
  }
}
