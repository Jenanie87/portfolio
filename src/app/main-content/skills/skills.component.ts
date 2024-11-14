import { Component, OnInit } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { ImageService } from '../../shared/image.service';
import { AnimationsService } from '../../shared/animations.service';
import { CommonModule } from '@angular/common';
import { ResponsiveDirective } from '../../responsive.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageService } from '../../shared/language.service';

interface Skill {
  name: string;
  image: string;
  imageRotation: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ResponsiveDirective, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [AnimationsService.prototype.rotateImage()]
})

export class SkillsComponent {
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
  currentImage = this.arrow_images[0];
  arrowEndPosition = false;
  currentLang: string;
  hoverIndex: number | null = null;
  isAnimating = false;
  isSmallScreen: boolean = false;

  skills: Skill[] = [
    {
      name: "Angular",
      image: "angular.svg",
      imageRotation: ["../../../assets/icons/skills/angular/first.svg", "../../../assets/icons/skills/angular/second.svg", "../../../assets/icons/skills/angular/third.svg", "../../../assets/icons/skills/angular/fourth.svg", "../../../assets/icons/skills/angular/fifth.svg",],
    },
    {
      name: "TypeScript",
      image: "typescript.svg",
      imageRotation: [],
    },
    {
      name: "JavaScript",
      image: "javaScript.svg",
      imageRotation: [],
    },
    {
      name: "HTML",
      image: "html.svg",
      imageRotation: [],
    },
    {
      name: "CSS",
      image: "css.svg",
      imageRotation: [],
    },
    {
      name: "Firebase",
      image: "firebase.svg",
      imageRotation: [],
    },
    {
      name: "Git",
      image: "git.svg",
      imageRotation: [],
    },
    {
      name: "Scrum",
      image: "scrum.svg",
      imageRotation: [],
    },
    {
      name: "Rest-Api",
      image: "api.svg",
      imageRotation: [],
    },
    {
      name: "Material Design",
      image: "material_design.svg",
      imageRotation: [],
    },
  ];

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

  startArrowRotation() {
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

  scrollToSkills(event: MouseEvent) {
    this.animationsService.scrollToSection(event, 'skills');
  }

  startAnimation(index: number) {
    if (!this.isSmallScreen) {
      if (!this.isAnimating) {   
        this.hoverIndex = index;
        this.isAnimating = true; 
      }
    }
  }

  resetAnimation() {
    this.hoverIndex = null;
    this.isAnimating = false;  
  }
}
