import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule, withHashLocation } from '@angular/router';
import { BrowserModule, withI18nSupport } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideToastr } from 'ngx-toastr';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { NgxLoadingModule } from "@dchtools/ngx-loading-v18";
import { withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    BrowserModule,
    BrowserAnimationsModule,
    provideRouter(routes,withHashLocation()),
    provideClientHydration(withI18nSupport()),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    NgxLoadingModule,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
