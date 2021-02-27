import { Component, OnInit } from '@angular/core';
import { DevService } from '../../../services/dev.service';
import { faCog, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-skills',
  templateUrl: './home-skills.component.html',
  styleUrls: ['./home-skills.component.scss'],
})
export class HomeSkillsComponent implements OnInit {
  public languages: object;
  public fasCog = faCog;
  public fasExclamationCircle = faExclamationCircle;

  constructor(private devService: DevService) {}

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
