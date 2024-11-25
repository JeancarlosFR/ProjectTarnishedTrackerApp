import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Seccion } from 'src/_models/seccion';
import { historialAsistencias } from 'src/_models/historialAsistencia';
import { inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AsistenciaService } from 'src/services/asistencia.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  NavController = inject(NavController);
  menuCtrl = inject(MenuController);
  asistenciaService = inject(AsistenciaService);

  Historial: historialAsistencias[] = [];

  constructor() {}

  async ngOnInit() {
    // Se ejecuta la primera vez que el componente se inicializa.
    await this.listarAsistencia();
  }

  async ionViewWillEnter() {
    // Se ejecuta cada vez que la página es visible.
    await this.listarAsistencia();
  }

  async listarAsistencia() {
    try {
      const lista = await this.asistenciaService.obtenerListaAsistencia<Seccion[]>();
      
      // Crear un mapeo entre secciones y nombres
      const seccionNombreMap: { [key: string]: string } = {
        'PDY12586': 'Programacion De Aplicaciones Moviles',
        'PDY13548': 'Ingles',
        'PDY14534': 'Arquitectura',
        'PDY15487': 'Calidad de Software',
        'PDY16487': 'Etica Para el Trabajo',
        'PDY17487': 'Estadistica Descriptiva',
      };
  
      // Filtrar secciones válidas
      const filtrarSecciones = lista.filter(seccion => Object.keys(seccionNombreMap).includes(seccion.seccion));
  
      this.Historial = [];
      filtrarSecciones.forEach(seccion => {
        seccion.asistencia.forEach(asistencia => {
          this.Historial.push({
            seccion: seccion.seccion,
            asistencia: asistencia.asistido,
            fecha: asistencia.fecha
          });
        });
      });
  
      console.log(this.Historial);
    } catch (error) {
      console.error('Error fetching asistencia:', error);
    }
  }

  volver() {
    this.NavController.back();
  }

  closeMenu() {
    this.menuCtrl.close();
  }
}
