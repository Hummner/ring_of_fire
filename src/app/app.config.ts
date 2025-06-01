import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-face6","appId":"1:253699682831:web:968a7e99394d279bc7a97a","storageBucket":"ring-of-fire-face6.firebasestorage.app","apiKey":"AIzaSyA5hodhRk-btwPhruItdmFl6IH0GVpeaKQ","authDomain":"ring-of-fire-face6.firebaseapp.com","messagingSenderId":"253699682831"})), provideFirestore(() => getFirestore())]
};
