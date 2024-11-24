import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ButtonModule } from 'primeng/button';
 


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

//=====FIREBASE========
import{AngularFireModule} from '@angular/fire/compat'; //
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ButtonModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), provideHttpClient(), provideFirebaseApp(() => initializeApp({"projectId":"tarnished-trackerapp","appId":"1:831560373335:web:9d36819351709fa8a8ff12","storageBucket":"tarnished-trackerapp.appspot.com","apiKey":"AIzaSyAQ0hxF_N05XEk5rzKlTtKlE6DhnS8sv4Y","authDomain":"tarnished-trackerapp.firebaseapp.com","messagingSenderId":"831560373335"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
  
  
})
export class AppModule {}