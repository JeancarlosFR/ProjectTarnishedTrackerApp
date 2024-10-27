import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'

})

export class NoAuthGuard implements CanActivate{

  firebaseSvc=inject(FirebaseService)
  utilsSvc=inject(UtilsService)


  canActivate(
    
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
      return new Promise((resolve) =>{

        this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
          //SI NO EXISTE AUTH ENTONCES SE RESUELVE EN TRUE
          if(!auth) resolve(true);//SE RESUELVE EN TRUE YA QUE ES CORRECTO QUE ESTEMOS EN EL LOGIN DE LA APP


          else{
            //PERO SI HAY UNA AUTENTICACIÓN NO SE DEVUELVE AL LOGIN, SI NO QUE AL INICIO DE LA APP
            this.utilsSvc.routerLink('/inicio');
            resolve(false); //Y SE RESUELVE EN FALSE
          }

        })


      });
    }
  }