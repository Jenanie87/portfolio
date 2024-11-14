import { Component, Input, Output, EventEmitter} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { AnimationsService } from '../../animations.service';
import { ResponsiveDirective } from '../../../responsive.directive';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [ResponsiveDirective, TranslateModule],
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
  animations: [
    new AnimationsService().fadeContentToBottom(),
    new AnimationsService().moveLine()
  ]
})
export class BurgerMenuComponent {
  @Input() animationState: 'start' | 'end' = 'start';
  @Input() bottomState: 'hidden' | 'visible' = 'hidden';
  @Input() backgroundState: 'first' | 'last' = 'first';

  @Output() toggleMenu = new EventEmitter<void>();

  isHovered = [false, false, false];
  currentLang: string;

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  onMenuClick() {
    this.toggleMenu.emit();
  }
}
