import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';
import { ResponsiveDirective } from '../responsive.directive';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HeroComponent, AboutMeComponent, SkillsComponent, PortfolioComponent, ReferencesComponent, ContactComponent, ResponsiveDirective],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent{

}
