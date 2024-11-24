import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Indica que el servicio es accesible en toda la aplicación.
})
export class AsistenciaService {
 
  private qrData = new Subject<any>();
  qrData$ = this.qrData.asObservable();

  constructor(
    private http: HttpClient, // Inyección del cliente HTTP para hacer solicitudes a la API.
    private firebaseService: FirebaseService // Servicio de Firebase para obtener el token de autenticación.
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

  async obtenerAsistencia() {
    const idToken = await this.firebaseService
      .getAuth()
      .currentUser?.getIdToken();

    const obs = this.http.get(
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

  // async obtenerQR () {
  //   const idToken = await this.firebaseService
  //     .getAuth()
  //     .currentUser?.getIdToken();

  //   const obs = this.http.get(
  //     'https://pgy4121serverlessapi.vercel.app/api/asistencia/qr?seccion=PruebaJeanyEdrian',
  //     {
  //       headers: {
  //         Authorization: 'Bearer ' + idToken,
  //         accept: 'text/html'
  //       },
  //     }
  //   );
  //   console.log(obs);
  //   return lastValueFrom(obs);
  // }

}