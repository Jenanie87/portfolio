import { Directive, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[appResponsive]',
  standalone: true
})
export class ResponsiveDirective {
  constructor(
    private element: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large
      ])
      .subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.adjustXSmallScreen();
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.adjustSmallScreen();
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.adjustMediumScreen();
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.adjustLargeScreen();
        } else {
          this.removeAllClasses();
        }
      });
  }

  private adjustXSmallScreen() {
    this.updateClasses('xsmall_screen', 'small_screen');
  }

  private adjustSmallScreen() {
    this.updateClasses('small_screen');
  }

  private adjustMediumScreen() {
    this.updateClasses('medium_screen');
  }

  private adjustLargeScreen() {
    this.updateClasses('large_screen');
  }

  private removeAllClasses() {
    const classes = ['xsmall_screen', 'small_screen', 'medium_screen', 'large_screen'];
    classes.forEach(className => this.element.nativeElement.classList.remove(className));
  }

  private updateClasses(...classes: string[]) {
    this.removeAllClasses();
    classes.forEach(className => {
      this.element.nativeElement.classList.add(className);
    });
  }
}
