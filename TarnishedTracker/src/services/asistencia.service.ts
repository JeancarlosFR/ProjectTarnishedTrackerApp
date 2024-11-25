import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class AsistenciaService {

  toastCtrl = inject(ToastController);

 
  

  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService 
  ) 
  {}

  

  async obtenerDatos() {
    const idToken = await this.firebaseService
      .getAuth()
      .currentUser?.getIdToken();

    const obs = this.http.get(
      'https://pgy4121serverlessapi.vercel.app/api/cuenta',
      {
        headers: {
          Authorization: 'Bearer ' + idToken,
        },
      }
    );
    console.log(idToken);
    return lastValueFrom(obs);
  }

  async obtenerListaAsistencia <T>() {
    const idToken = await this.firebaseService
      .getAuth()
      .currentUser?.getIdToken();

    const obs = this.http.get<T>(
      'https://pgy4121serverlessapi.vercel.app/api/asistencia/listar',
      {
        headers: {
          Authorization: 'Bearer ' + idToken,
        },
      }
    );
    console.log(obs);
    return lastValueFrom(obs);
  }





  async registrarAsistencia(datosQR: any) {
    try {
      const idToken = await this.firebaseService
        .getAuth()
        .currentUser?.getIdToken();
  
      const obs = this.http.post(
        'https://pgy4121serverlessapi.vercel.app/api/asistencia/qr',
        datosQR, // Datos que se enviarán en el cuerpo de la solicitud
        {
          headers: {
            Authorization: 'Bearer ' + idToken, 
          },
        }
      );
  
      const response = await lastValueFrom(obs);
      console.log('Asistencia registrada:', response);
      return response;
    } catch (error: any) {
      // Verifica si el error tiene un código de estado 400
      if (error.status === 400) {
        const toast = await this.toastCtrl.create({
          message: 'Alumno ya asistido',
          duration: 2000,
          position: 'bottom',
          color: 'medium',
        });
        toast.present();
        console.warn('Alumno ya asistió:', error.error?.message || 'Error 400');
        return { status: 400, message: 'Alumno ya asistido' };
      }
      if (error.status === 404) {
        const toast = await this.toastCtrl.create({
          message: 'El Codigo QR ha caducado',
          duration: 2000,
          position: 'bottom',
          color: 'medium',
        });
        toast.present();
        console.warn('Codigo QR Caducado', error.error?.message || 'Error 404');
        return { status: 400, message: 'Codigo QR Caducado' };
      }
      else {
        
        const toast = await this.toastCtrl.create({
          message: 'Error al registrar asistencia',
          duration: 2000,
          position: 'bottom',
          color: 'medium',
        });
        toast.present();
        console.error('Error al registrar asistencia:', error);
        throw new Error(error.error?.message || 'Error al registrar asistencia');
      }
    }
  }

  
  

}