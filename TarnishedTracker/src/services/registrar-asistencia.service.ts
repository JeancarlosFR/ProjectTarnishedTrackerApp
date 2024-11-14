import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Asistencias } from 'src/_models/asistencias';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private asistenciaCollection: AngularFirestoreCollection<Asistencias>;

  constructor(private firestore: AngularFirestore) {
    this.asistenciaCollection = this.firestore.collection<Asistencias>('asistencias');
  }

  // Método para agregar o actualizar la asistencia de una asignatura
  addOrUpdateAsistencia(asistencia: Asistencias) {
    // Busca el documento por la sigla
    return this.asistenciaCollection.doc(asistencia.sigla).set(asistencia, { merge: true });
  }

  // Obtener todas las asistencias para mostrar el historial
  getAsistencias(): Observable<Asistencias[]> {
    return this.asistenciaCollection.valueChanges();
  }

  // Obtener una asistencia específica por sigla
  getAsistenciaBySigla(sigla: string): Observable<Asistencias | undefined> {
    return this.asistenciaCollection.doc<Asistencias>(sigla).valueChanges();
  }
}
