import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, NgClass,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('toggle') toggle: any;
  @ViewChild('dropdown') dropdown: any;
  isLogin!: boolean;
  localStore: any;
  constructor(
    private AuthService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    this.localStore = (this.document as Document).defaultView?.localStorage;
    const storedToken = this.localStore?.getItem('userToken');
    this.AuthService.token.next(storedToken);
    this.isLogin = storedToken !== null;
    this.AuthService.token.subscribe((token: any) => {
      this.isLogin = token !== null;
    });
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  listToggle() {
    this.dropdown?.nativeElement.classList.toggle('hidden');
  }
  logOut() {
    this.AuthService.logOut();
  }
}
