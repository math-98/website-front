import { Component } from '@angular/core';
import { faCog, faGlobe, faStar } from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faFacebookF,
  faGithub,
  faGitlab,
  faLinkedinIn,
  faSteamSymbol,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public fasCog = faCog;
  public fasStar = faStar;
  public fasGlobe = faGlobe;
  public fabFacebookF = faFacebookF;
  public fabTwitter = faTwitter;
  public fabLinkedinIn = faLinkedinIn;
  public fabGithub = faGithub;
  public fabGitlab = faGitlab;
  public fabSteamSymbol = faSteamSymbol;
  public fabDiscord = faDiscord;

  public photo_url = environment.apiBase + '/storage/photo.jpg';

  constructor(private viewportScroller: ViewportScroller) {}

  scroll(section): void {
    this.viewportScroller.scrollToAnchor(section);
  }
}
