import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { ResponsiveDirective } from '../../responsive.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ResponsiveDirective, RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isSmallScreen: boolean = false;
  currentLang: string;
  
  constructor(private languageService: LanguageService, private breakpointObserver: BreakpointObserver) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }
}
