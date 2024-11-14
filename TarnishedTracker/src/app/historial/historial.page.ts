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
        asistencias:['Lunes 15/07','Lunes 22/07','Lunes 29/07', 'Lunes 05/08', 'Lunes 12/08'],
        estados:['Presente','Ausente','Presente','Ausente'],
        totClases: 0,
        clasesAsistidas:0
      },
      {
        sigla: 'PGY4121-003V',
        nombre: 'Programación de Aplicaciones Móviles',
        asistencias:['Martes 16/07','Martes 23/07','Martes 30/07','Martes 06/08','Martes 23/07','Martes 23/07'],
        estados:['Presente','Presente','Presente','Presente'],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'INI5111-005V',
        nombre: 'Ingles',
        asistencias:['Lunes 15/07','Miercoles 17/07','Lunes 22/07','Miercoles 24/07'],
        estados:['Presente','Presente','Presente','Justificado'],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'MAT4140-003V',
        nombre: 'Estadistica Descriptiva',
        asistencias:['Sabado 20/07','Sabado 27/07','Sabado 03/08','Sabado 10/08'],
        estados:['Presente','Presente','Ausente','Presente'],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'CSY4111-003V',
        nombre: 'Calidad de Software',
        asistencias:['Viernes 19/07','Viernes 26/07','Viernes 02/08','Viernes 09/08'],
        estados:['Presente','Justificado','Presente','Presente'],
        totClases:0,
        clasesAsistidas:0

      },
      {
        sigla: 'EAY4450-003V',
        nombre: 'Etica para el Trabajo',
        asistencias:['Sabado 20/07','Sabado 27/07','Sabado 03/08','Sabado 10/08'],
        estados:['Presente','Presente','Ausente','Presente'],
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
