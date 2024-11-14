import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private defaultLang = 'en';

  constructor(private translate: TranslateService) { 
    const savedLang = localStorage.getItem('lang') || this.defaultLang;
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang); // Speichere die Sprache in localStorage
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLang;
  }
}
