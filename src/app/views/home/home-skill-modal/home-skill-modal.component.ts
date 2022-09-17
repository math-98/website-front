import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Skill } from 'src/app/models/skill';
import { PortfolioService } from '../../../services/portfolio.service';

@Component({
  selector: 'app-home-skill-modal',
  templateUrl: './home-skill-modal.component.html',
  styleUrls: ['./home-skill-modal.component.scss'],
})
export class HomeSkillModalComponent implements OnInit {
  skill: Skill;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
}
