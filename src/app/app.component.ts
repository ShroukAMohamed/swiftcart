import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "@dchtools/ngx-loading-v18";
import { Router, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';
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
  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
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
