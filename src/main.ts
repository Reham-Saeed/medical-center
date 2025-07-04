import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register as registerSwiperElements}from 'swiper/element/bundle';
import { initializeApp } from 'firebase/app';
import { environment } from './app/environments/environment';

initializeApp(environment.firebase);
registerSwiperElements();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
