import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, LegalNoticeComponent, MainContentComponent, LayoutModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  currentLang: string;
  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }
}
