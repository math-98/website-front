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
    this.setTag('og:site_name', 'Mathieu SERVIERE');
    this.setTag('og:type', 'website');

    this.setSocialImages(location.origin + 'img/photo.jpg');
    this.setTag('og:image:alt', 'logo');
  }

  getPageTitle(): string {
    const fullTitle = this.getFullTitle();
    if (fullTitle.endsWith(' - Mathieu SERVIERE')) {
      return fullTitle.substring(0, fullTitle.length - 19);
    }
    return fullTitle;
  }

  setPageTitle(value: string): void {
    if (!value) {
      return;
    }

    const fullTitle = value + ' - Mathieu SERVIERE';
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
