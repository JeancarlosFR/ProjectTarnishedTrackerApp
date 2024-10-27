import { initializeApp } from "firebase/app";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from "./environments/environment";

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  const firebaseApp = initializeApp(environment.firebaseConfig);