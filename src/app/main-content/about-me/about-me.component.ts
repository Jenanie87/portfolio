import { Component } from '@angular/core';
import { AnimationsService } from '../../shared/animations.service';
import { ResponsiveDirective } from '../../responsive.directive';
import {TranslateModule} from "@ngx-translate/core";
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [ResponsiveDirective, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [AnimationsService.prototype.getButtonAnimation()]
})
export class AboutMeComponent {
  currentState = 'start'; 
  currentLang: string;

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  toggleAnimation(state: 'start' | 'end') {
    this.currentState = state;
  }
}
