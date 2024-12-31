import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "@dchtools/ngx-loading-v18";
import { Router, NavigationEnd } from '@angular/router';
declare var AOS: any;
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'swiftcart';
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      import('aos').then(AOS => {
        setTimeout(() => {
          AOS.init();
        }, 100);
      });
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          import('aos').then(AOS => {
            setTimeout(() => {
              AOS.refresh();
            }, 100);
          });
        }
      }
    });
  }
}
