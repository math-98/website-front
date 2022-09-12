import { Component, Input, OnInit } from '@angular/core';
import { PortfolioPost } from '../../../models/portfolio-post';

@Component({
  selector: 'app-home-portfolio-item',
  templateUrl: './home-portfolio-item.component.html',
  styleUrls: ['./home-portfolio-item.component.scss'],
})
export class HomePortfolioItemComponent implements OnInit {
  @Input()
  public post: PortfolioPost;

  public badgeBgColor: string;
  public badgeTextColor: string;

  constructor() {}

  ngOnInit(): void {
    this.badgeBgColor =
      this.post.statusColor == 'primary' ? 'light' : this.post.statusColor;
    this.badgeTextColor = PortfolioPost.statusTextColor(this.badgeBgColor);
  }
}
