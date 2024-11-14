import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { ResponsiveDirective } from '../responsive.directive'; 
import { LanguageService } from '../shared/language.service';


@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [ResponsiveDirective, TranslateModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  currentLang: string;

    constructor(private languageService: LanguageService) {
      this.currentLang = this.languageService.getCurrentLanguage();
  }
}
