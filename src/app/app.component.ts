import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private role: string = '';
  isLoggedIn = false;
  showDoctorSchedule = false;
  showPatientSchedule = false;
  email?: string;
  cookieMessage: string = "This website uses cookies to ensure you get the best experience on our website.";
  cookieDismiss: string = "Accept";
  cookieLinkText: string = "Learn more";
  

  constructor(private tokenStorageService: TokenStorageService, private toastrService: ToastService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;

      this.showDoctorSchedule = this.role == 'doctor';
      this.showPatientSchedule = this.role == 'patient';

      this.email = user.name;

      let cc = window as any;
       cc.cookieconsent.initialise({
         palette: {
           popup: {
             background: "#164969"
           },
           button: {
             background: "#ffe000",
             text: "#164969"
           }
         },
         theme: "classic",
         content: {
           message: this.cookieMessage,
           dismiss: this.cookieDismiss,
           link: this.cookieLinkText,
           href: "https://gdpr-info.eu/" 
         }
       });
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();

    setTimeout(() => {
      window.location.reload();
    }, 3000);

    this.showWarning();
  }

  showWarning() {
    const options = { opacity: 0.8 };
    this.toastrService.warning('Come back!', 'Logged out!', options);
  }
}