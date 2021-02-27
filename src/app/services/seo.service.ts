import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  reset(): void {
    this.setTag('twitter:card', 'summary');
    this.setTag('twitter:author', '@mathieu998');
    this.setTag('og:site_name', 'math-98');
    this.setTag('og:type', 'website');

    this.setSocialImages(location.origin + 'img/avatar.png');
    this.setTag('og:image:alt', 'logo');
  }

  getPageTitle(): string {
    const fullTitle = this.getFullTitle();
    if (fullTitle.endsWith(' - math-98')) {
      return fullTitle.substr(0, fullTitle.length - 10);
    }
    return fullTitle;
  }

  setPageTitle(value: string): void {
    const fullTitle = value + ' - math-98';
    this.title.setTitle(fullTitle);
    this.setTag('og:title', fullTitle);
  }

  getFullTitle(): string {
    return this.title.getTitle();
  }

  getTag(key: string): string {
    const element = this.meta.getTag("name='" + key + "'");
    if (element) {
      return element.content;
    }
    return '';
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
  }

  setDescription(value): void {
    this.setTag('description', value);
    this.setTag('og:description', value);
  }

  setSocialImages(url: string): void {
    this.setTag('og:image', url);
  }
}
