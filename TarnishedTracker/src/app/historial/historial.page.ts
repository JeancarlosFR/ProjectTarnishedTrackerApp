import { Asistencias } from '../../_models/asistencias';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { inject } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  NavController = inject(NavController);
  menuCtrl = inject(MenuController);

  asistencias: Asistencias[] = [];

  constructor() { }

  ngOnInit() {
    

    this.asistencias = [
      {
        sigla: 'ASY4131-003V',
        nombre: 'Arquitectura',
        asistencias:[],
        estados:[],
        totClases: 0,
        clasesAsistidas:0
      },
      {
        sigla: 'PGY4121-003V',
        nombre: 'Programación de Aplicaciones Móviles',
        asistencias:[],
        estados:[],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'INI5111-005V',
        nombre: 'Ingles',
        asistencias:[],
        estados:[],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'MAT4140-003V',
        nombre: 'Estadistica Descriptiva',
        asistencias:[],
        estados:[],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'CSY4111-003V',
        nombre: 'Calidad de Software',
        asistencias:[],
        estados:[],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'EAY4450-003V',
        nombre: 'Etica para el Trabajo',
        asistencias:[],
        estados:[],
        totClases:0,
        clasesAsistidas:0
      }
    ];
    this.asistencias.forEach(asistencias => {
      asistencias.totClases = this.calcularTotalClases(asistencias);
      asistencias.clasesAsistidas = this.calcularClasesAsistidas(asistencias);
    });
    
  }
  calcularTotalClases(asistencias: Asistencias): number {
    return Number(asistencias.asistencias.length.toFixed(2));
  }

  calcularClasesAsistidas(asistencias: Asistencias): number {
    return Number(asistencias.estados.filter(estado => estado === 'Presente').length.toFixed(2));
  }

  volver() {
    this.NavController.back();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

}
