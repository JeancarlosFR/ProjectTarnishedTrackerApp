import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Seccion } from 'src/_models/seccion';
import { inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AsistenciaService } from 'src/services/asistencia.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  NavController = inject(NavController);
  loadSrv = inject(LoadingController);
  menuCtrl = inject(MenuController);
  asistenciaService = inject(AsistenciaService);

  Seccion: Seccion[] = [];

  constructor() {}

  async ngOnInit() {
    const load = await this.loadSrv.create({
      message: 'Cargando Asistencia',
      duration: 3000,
    });
    await load.present();

    // Se ejecuta la primera vez que el componente se inicializa.

    await this.listarAsistencia();
    await load.dismiss();

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
  
      this.Seccion = [];
  
      filtrarSecciones.forEach(seccion => {
        seccion.asistencia.forEach(asistencia => {
          // Buscar si la sección ya existe en this.Seccion
          const existingSection = this.Seccion.find(s => s.seccion === seccion.seccion);
  
          if (existingSection) {
            // Agregar la asistencia a la sección existente
            existingSection.asistencia.push(asistencia);
          } else {
            // Crear una nueva sección si no existe
            this.Seccion.push({
              nombre: seccionNombreMap[seccion.seccion],
              seccion: seccion.seccion,
              asistencia: [asistencia], // Crear un nuevo arreglo con la primera asistencia
            });
          }
        });
      });
  
      console.log(this.Seccion);
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
