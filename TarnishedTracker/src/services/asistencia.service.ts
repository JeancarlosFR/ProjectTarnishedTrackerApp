import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Indica que el servicio es accesible en toda la aplicación.
})
export class AsistenciaService {
  // URL de la API para registrar la asistencia (debe ser reemplazada por la URL real de tu API).
  private apiUrl = 'https://pgy4121serverlessapi.vercel.app/api/cuenta';
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

}