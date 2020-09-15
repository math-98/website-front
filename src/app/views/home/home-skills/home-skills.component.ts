import { Component, OnInit } from '@angular/core';
import { DevService } from '../../../services/dev.service';
import { DevLanguage } from '../../../models/dev-language';

@Component({
  selector: 'app-home-skills',
  templateUrl: './home-skills.component.html',
  styleUrls: ['./home-skills.component.scss'],
})
export class HomeSkillsComponent implements OnInit {
  private devService: DevService;
  public languages: object;

  constructor(devService: DevService) {
    this.devService = devService;
  }

  ngOnInit(): void {
    this.languages = undefined;
    this.devService
      .listLanguages()
      .then((languages) => {
        this.languages = languages;

        if (languages.length === 0) {
          console.error('No dev language returned by API!');
        }
      })
      .catch((err) => {
        console.log(err);
        this.languages = [];
      });
  }
}
