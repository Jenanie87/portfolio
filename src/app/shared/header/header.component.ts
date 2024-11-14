import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { ResponsiveDirective } from '../../responsive.directive';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BurgerMenuComponent, ResponsiveDirective, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  burgerImages_forward: string[] = [
    "../../../assets/icons/header/burgerMenu.svg",
    "../../../assets/icons/header/burgerMenu_1.svg",
    "../../../assets/icons/header/burgerMenu_2.svg",
    "../../../assets/icons/header/burgerMenu_3.svg",
    "../../../assets/icons/header/burgerMenu_4.svg"
  ]
  burgerImages_back: string[] = [
    "../../../assets/icons/header/burgerMenu_4.svg",
    "../../../assets/icons/header/burgerMenu_3.svg",
    "../../../assets/icons/header/burgerMenu_2.svg",
    "../../../assets/icons/header/burgerMenu_1.svg",
    "../../../assets/icons/header/burgerMenu.svg"
  ]
  currentIndex = 0;
  currentImage = this.burgerImages_forward[0];
  burgerEndPosition = false;
  isForward = true;
  isAnimating = false;
  classD_none = true;
  navAnimationState: 'start' | 'end' = 'start';
  bottomState : 'hidden' | 'visible' = 'hidden';
  backgroundState: 'first' | 'last' = 'first';
  currentLang: string;
  isXSmallScreen: boolean = false;

  constructor(private languageService: LanguageService, private breakpointObserver: BreakpointObserver) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .subscribe(result => {
      this.isXSmallScreen = result.matches;
    });
  }

  useLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLang = lang;  
  }

  startImageRotation() {
    if (this.isAnimating) {
      return; 
    }
    this.isAnimating = true;

    let interval = setInterval(() => {
      if (this.isForward) {
        this.currentIndex++;
        if (this.currentIndex >= this.burgerImages_forward.length - 1) {
          this.currentIndex = this.burgerImages_forward.length - 1; 
          this.isForward = false; 
          clearInterval(interval); 
          this.isAnimating = false; 
        }
      } else {
        this.currentIndex--;
        if (this.currentIndex <= 0) {
          this.currentIndex = 0; 
          this.isForward = true; 
          clearInterval(interval); 
          this.isAnimating = false;
        }
      }
      this.currentImage = this.burgerImages_forward[this.currentIndex];
    }, 50); 
  }

  toggleBurgerMenu() {
    this.startImageRotation();
    this.classD_none = !this.classD_none;
    
    this.navAnimationState = this.classD_none ? 'start' : 'end';
    this.backgroundState = this.backgroundState === 'first' ? 'last' : 'first';
    setTimeout(() => {
      this.bottomState = this.bottomState === 'hidden' ? 'visible' : 'hidden';
    }, 50);

    if (!this.classD_none) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = '';
    }
  }
}
