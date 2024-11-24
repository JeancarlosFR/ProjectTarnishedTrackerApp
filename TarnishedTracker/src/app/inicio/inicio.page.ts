import { Component, inject, Injectable, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController, AnimationController } from '@ionic/angular';
import { from, lastValueFrom, timer } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utils.service';
import { User } from 'src/_models/user.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  {
  loadSrv = inject(LoadingController);
  NavController = inject(NavController);
  menuCtrl = inject(MenuController);
  animacion = inject(AnimationController);
  toastCtrl = inject(ToastController);

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  usuario: string | null = '';

  constructor() {}

  async cerrarSesion() {
    const load = await this.loadSrv.create({
      message: 'Cerrando Sesión',
      duration: 3000,
    });
    await load.present();
    await lastValueFrom(timer(2000));
    await load.dismiss();

    this.animar().then(() => {
      // Navegar a la página de inicio de sesión después de la animación
      this.firebaseSvc.singOut(); //SE LLAMA A LA FUNCIÓN DEL FIREBASE SERVICE PARA CERRAR LA SESIÓN
      this.NavController.navigateRoot('/home');
      toast.present();
    });
    const toast = await this.toastCtrl.create({
      message: 'Sesión cerrada con exito',
      duration: 2000,
      position: 'bottom',
      color: 'medium',
    });
  }

  animar() {
    return new Promise<void>((resolve) => {
      const el = document.querySelector('#main-content')!;
      const animCerrarSesion = this.animacion
        .create()
        .addElement(el)
        .duration(2000)
        .fromTo('opacity', '1', '0') // Cambia la opacidad de 1 a 0
        
      animCerrarSesion.onFinish(() => {
        resolve(); // Resuelve la promesa cuando la animación termine

       
      });

      animCerrarSesion.play();
      
    });
  }

  volver() {
    this.NavController.back();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  //CERRAR SESIÓN
  /*cerrarSesion(){
    this.firebaseSvc.singOut();
  }*/
}
