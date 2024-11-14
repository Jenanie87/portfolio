import { Component, OnInit } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ImageService } from '../../shared/image.service';
import { AnimationsService } from '../../shared/animations.service';
import { ResponsiveDirective } from '../../responsive.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageService } from '../../shared/language.service';
import AOS from 'aos';

interface Project {
  name: string;
  image: string;
  techstack: string[];
  description: string;
  link: string;
  preview: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ResponsiveDirective, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [AnimationsService.prototype.getButtonAnimation(),
  AnimationsService.prototype.fadeContentToSide(),
  AnimationsService.prototype.projectHoverAnimation()
  ]
})
export class PortfolioComponent implements OnInit {
  readonly mediumArrowImages: string[] = [
    "../../../assets/img/arrow_right/first.png",
    "../../../assets/img/arrow_right/second.png",
    "../../../assets/img/arrow_right/third.png",
  ]

  readonly smallArrowImages: string[] = [
    "../../../assets/img/arrow_right/small_first.png",
    "../../../assets/img/arrow_right/small_second.png",
    "../../../assets/img/arrow_right/small_third.png",
  ]
  arrow_images: string[] = [...this.mediumArrowImages];
  currentIndex = 0;
  currentImage = this.arrow_images[0];
  arrowEndPosition = false;
  currentState = 'start';
  currentLang: string;
  hoverIndex: number | null = null;
  buttonHoverIndex: string | null = null;
  imageAnimationState = 'grey';
  informationAnimationState = 'start';
  isMediumScreen: boolean = false;
  isSmallScreen: boolean = false;
  isXSmallScreen: boolean = false;

  projects: Project[] = [
    {
      name: "Join",
      image: "join.png",
      techstack: ["JavaScript", "HTML", "CSS", "Firebase"],
      description: "Taks manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
      link: "https://github.com/Jenanie87/Join-Kanban",
      preview: "https://join.jenniferdahm.com",
    },
    {
      name: "Entventure",
      image: "entventure.png",
      techstack: ["JavaScript", "HTML", "CSS"],
      description: "A simple Jump-and-Run game based on an object-oriented approach. Help the Ent to collect coins and pinecones to fight against the orks.",
      link: "https://github.com/Jenanie87/entventure",
      preview: "https://entventure.jenniferdahm.com",
    },
    {
      name: "Pokèdex",
      image: "pokedex.png",
      techstack: ["JavaScript", "HTML", "CSS", "Api"],
      description: "Based on the PokèApi a simple library that provides and catalogues pokemon information.",
      link: "https://github.com/Jenanie87/pokedex",
      preview: "https://pokedex.jenniferdahm.com",
    },
  ]

  constructor(private languageService: LanguageService, private imageService: ImageService, private animationsService: AnimationsService, private breakpointObserver: BreakpointObserver) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .subscribe(result => {
      this.isMediumScreen = result.breakpoints[Breakpoints.Medium];
      this.isSmallScreen = result.breakpoints[Breakpoints.Small];
      this.isXSmallScreen = result.breakpoints[Breakpoints.XSmall];
      this.arrow_images = this.isSmallScreen ? this.smallArrowImages : this.mediumArrowImages;
      this.currentImage = this.arrow_images[0];
    });
  }

  ngOnInit() {
    AOS.init({

    });
  }

  setHoverIndex(index: number) {
    this.hoverIndex = index;
  }
  
  clearHoverIndex() {
    this.hoverIndex = null;
  }

  toggleButtonAnimation(state: 'start' | 'end', index: number, buttonType: string) {
    this.currentState = state;
    this.buttonHoverIndex = state === 'end' ? `${index}-${buttonType}` : null;
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

  combineArrayElements(array: string[]) {
    return array.join(" | ");
  }

  scrollToPortfolio(event: MouseEvent) {
    this.animationsService.scrollToSection(event, 'portfolio');
  }

  startAnimation(index: number) {
    this.setHoverIndex(index);
    setTimeout(() => {
      this.informationAnimationState = 'end'; 
  }, 1); 
  }

  resetAnimation() {
    this.clearHoverIndex();
  }
} 
