import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MatomoInjector, MatomoTracker } from 'ngx-matomo';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private _description = '';
  get description() {
    return this._description;
  }
  set description(value: string) {
    this.setTag('description', value);
    this.setTag('og:description', value);
    this._description = value;
  }

  private _page_title = '';
  get page_title() {
    return this._page_title;
  }
  set page_title(value: string) {
    this._page_title = value;
    this.title.setTitle(this.full_title);
    this.setTag('og:title', this.full_title);
  }
  get full_title() {
    return this.page_title + ' - math-98';
  }

  private _image_url;
  get image_url() {
    return this._image_url;
  }
  private _image_alt;
  get image_alt() {
    return this._image_alt;
  }

  private _url;
  get url() {
    return this._url;
  }
  set url(value: string) {
    this.setTag('og:url', value);
    this._url = value;
  }

  private matomoInjected = false;
  private tags = {};

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private matomoInjector: MatomoInjector,
    private tracker: MatomoTracker
  ) {
    this.reset();
  }

  reset(): void {
    this.tags = [];
    this.setTag('twitter:card', 'summary');
    this.setTag('twitter:author', '@mathieu998');
    this.setTag('og:site_name', 'math-98');
    this.setTag('og:type', 'website');
    this.image(location.origin + 'img/avatar.png');
  }

  update(data, routeAnalytics = true) {
    this.reset();
    const analytics = routeAnalytics && environment.matomo.enabled;
    const url = location.origin + this.router.url;

    this.page_title = data.title;
    this.url = url;
    if (data.description) {
      this.description = data.description;
    }
    if (data.image_url) {
      this.image(data.image_url, data.image_alt);
    }

    if (analytics) {
      this.tracker.setCustomUrl(url);
      this.tracker.setDocumentTitle(this.page_title);

      if (this.matomoInjected) {
        this.tracker.trackPageView();
      } else {
        this.matomoInjector.init(
          environment.matomo.url,
          environment.matomo.siteId
        );
        this.matomoInjected = true;
      }
    }
  }

  getTag(key: string): string {
    return this.tags[key];
  }

  setTag(key: string, value: string): void {
    const element = {
      name: key,
      content: value,
    };

    if (this.getTag(key)) {
      this.meta.updateTag(element);
    } else {
      this.meta.addTag(element);
    }
    this.tags[key] = value;
  }

  image(url: string, alt: string = 'logo'): void {
    this.setTag('og:image', url);
    this.setTag('og:image:alt', alt);
    this._image_url = url;
    this._image_alt = alt;
  }
}
