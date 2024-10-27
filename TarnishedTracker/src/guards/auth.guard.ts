import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'

})

export class AuthGuard implements CanActivate{

  //SE INJECTAN LOS SERVICIOS
  firebaseSvc=inject(FirebaseService)
  utilsSvc=inject(UtilsService)


  canActivate(
    
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //VARIABLE PARA TRAER EL USER GUARDADO EN EL LOCALSTORAGE
      let user=localStorage.getItem('user');
      //SE RETORNA UNA PROMESA
      return new Promise((resolve) =>{
        //EL METODO ON AUTH STATE CHANGE INDICA SI EXISTE UN USUARIO AUTENTICADO O NO
        this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
          //SI EXISTE AUTH SIGNIFICA QUE HAY UN USUARIO AUTENTICADO
          if(auth){
            if(user) resolve(true); //SI EXISTE UNA AUTENTICACIÓN Y ADEMAS EXISTE UN USUARIO ENTONCES RESUELVE EN TRUE
          }
          else{ //SI NO SE CUMPLEN LAS CONDICIONES SE ENVIARA AL HOME
            this.utilsSvc.routerLink('/home');
            resolve(false); //SE RESUELVE EN FALSO
          }

        })


      });
    }
  }