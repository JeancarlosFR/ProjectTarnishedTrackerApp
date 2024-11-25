import { Asistencias } from 'src/_models/asistencias';

export interface Seccion {
    nombre: string;
    seccion: string;
    asistencia: Asistencias[];
  }