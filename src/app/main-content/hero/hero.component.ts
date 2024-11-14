import { Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ResponsiveDirective } from '../../responsive.directive';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ResponsiveDirective, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  currentIndex = 0;
  currentLang: string;
  arrow_images: string[] = [
    "../../../assets/img/arrow_scroll/first.png",
    "../../../assets/img/arrow_scroll/second.png",
    "../../../assets/img/arrow_scroll/third.png",
    "../../../assets/img/arrow_scroll/fourth.png",
    "../../../assets/img/arrow_scroll/fourth.png",
    "../../../assets/img/arrow_scroll/fifth.png",
    "../../../assets/img/arrow_scroll/sixth.png",
  ];

  currentImage: string = this.arrow_images[0];

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.startImageRotation();
  }

  startImageRotation() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.arrow_images.length;
      this.currentImage = this.arrow_images[this.currentIndex];
    }, 200);
  }
}
