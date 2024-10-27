import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  //VARIABLES PAR INJECTAR LOADGIN Y TOAST CONTROLLER
  loadingCtrl = inject(LoadingController);
  toastCtrl= inject(ToastController);
  router=inject(Router);


  //=======LOADING========
  //RETORNA UN SPINNER DE CARGA
  loading(){
    return this.loadingCtrl.create({spinner: 'circles'});
  }
  
  //TOAST
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //FUNCIÓN QUE ENRUTA CUALQUIER PAGINA DISPONIBLE
  routerLink(url:string){

    return this.router.navigateByUrl(url);

  }

  //FUNCION PARA GUARDAR UN ELEMENTO EN EL LOCASTORAGE
  saveInLocalStorage(key: string, value: any){
    //LO QUE SE GUARDA EN EL LOCAL STORAGE DEBE SER DE TIPO STRING POR LO TANTO SE OCUPA JSON PARA TRANSFORMAR LOS DATOS RECIBIDOS A STRING
    return localStorage.setItem(key, JSON.stringify(value))

  }

  //FUNCIÓN PARA OBTENER EL ELEMENTO DEL LOCASTORAGE
  getFromLocalStorage(key: string){
    //SE UTILIZA JSON PARSE PARA OBTENER LOS DATOS GUARDADOS EN LOCAL STORAGE Y DEVOLVERLOS A SU VALOR DE ORIGEN
    return JSON.parse(localStorage.getItem(key));

  }



}
