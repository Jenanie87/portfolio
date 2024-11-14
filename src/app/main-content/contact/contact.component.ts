import { Component, inject, VERSION } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResponsiveDirective } from '../../responsive.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ResponsiveDirective, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = 'Angular ' + VERSION.major;
  isChecked: boolean = false;
  isSmallScreen: boolean = false;
  isDialogVisible: boolean = false;
  currentLang: string;

  http = inject(HttpClient)

  constructor(private languageService: LanguageService, private breakpointObserver: BreakpointObserver) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  toggleChecked() {
    this.isChecked = !this.isChecked;
  }

  contactData = {
    name: "",
    email: "",
    message: "",
  }

  post = {
    endPoint: 'https://jenniferdahm.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted && this.isChecked) {

      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.isDialogVisible = true;
            setTimeout(() => {
              this.isDialogVisible = false;
            }, 2000);
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      Object.values(ngForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    setTimeout(() => {
      this.isChecked = false;
    }, 1000);
  }

  isFormValid(ngForm: NgForm) {
    return ngForm.valid && this.isChecked;
  }
}


