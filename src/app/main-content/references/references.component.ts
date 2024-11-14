import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { ImageService } from '../../shared/image.service';
import { AnimationsService } from '../../shared/animations.service';
import { ResponsiveDirective } from '../../responsive.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [ResponsiveDirective, TranslateModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  readonly mediumArrowImages: string[] = [
    "../../../assets/img/arrow_left/first.png",
    "../../../assets/img/arrow_left/second.png",
    "../../../assets/img/arrow_left/third.png",
  ]

  readonly smallArrowImages: string[] = [
    "../../../assets/img/arrow_left/small_first.png",
    "../../../assets/img/arrow_left/small_second.png",
    "../../../assets/img/arrow_left/small_third.png",
  ];
  arrow_images: string[] = [...this.mediumArrowImages];
  currentIndex = 0;
  currentLang: string;
  currentImage = this.arrow_images[0];
  arrowEndPosition = false;
  isSmallScreen: boolean = false;

  constructor(private languageService: LanguageService, private imageService: ImageService, private animationsService: AnimationsService, private breakpointObserver: BreakpointObserver) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .subscribe(result => {
      this.isSmallScreen = result.matches;
      this.arrow_images = this.isSmallScreen ? this.smallArrowImages : this.mediumArrowImages;
      this.currentImage = this.arrow_images[0];
    });
  }

  startImageRotation() {
    this.imageService.changeImages(
      this.arrow_images, 
      this.currentIndex, 
      this.arrowEndPosition, 
      200,
      (newImage: string, newIndex: number, endPosition: boolean) => {
        this.currentImage = newImage;
        this.currentIndex = newIndex;
        this.arrowEndPosition = endPosition;
      }
    );
  }

  scrollToContact(event: MouseEvent) {
    this.animationsService.scrollToSection(event, 'contact');
  }
}
