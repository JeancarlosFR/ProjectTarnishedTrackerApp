import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { inject } from '@angular/core';
import { Ramos } from 'src/_models/ramos';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  NavController = inject(NavController);
  menuCtrl = inject(MenuController);

  ramos: Ramos[] = [];

  constructor() { }

  ngOnInit() {

    this.ramos = [
      {
        sigla: 'ASY4131-003V',
        nombre: 'Arquitectura',
        asistencias:['Lunes 15/07','Lunes 22/07','Lunes 29/07', 'Lunes 05/08'],
        estados:['Presente','Ausente','Presente','Ausente'],
        totClases:4,
        clasesAsistidas:2
      },
      {
        sigla: 'PGY4121-003V',
        nombre: 'Programación de Aplicaciones Móviles',
        asistencias:['Martes 16/07','Martes 23/07','Martes 30/07','Martes 06/08'],
        estados:['Presente','Presente','Presente','Presente'],
        totClases:4,
        clasesAsistidas:4

      },
      {
        sigla: 'INI5111-005V',
        nombre: 'Ingles',
        asistencias:['Lunes 15/07','Miercoles 17/07','Lunes 22/07','Miercoles 24/07'],
        estados:['Presente','Presente','Presente','Justificado'],
        totClases:4,
        clasesAsistidas:3

      },
      {
        sigla: 'MAT4140-003V',
        nombre: 'Estadistica Descriptiva',
        asistencias:['Sabado 20/07','Sabado 27/07','Sabado 03/08','Sabado 10/08'],
        estados:['Presente','Presente','Ausente','Presente'],
        totClases:4,
        clasesAsistidas:3

      },
      {
        sigla: 'CSY4111-003V',
        nombre: 'Calidad de Software',
        asistencias:['Viernes 19/07','Viernes 26/07','Viernes 02/08','Viernes 09/08'],
        estados:['Presente','Justificado','Presente','Presente'],
        totClases:4,
        clasesAsistidas:3

      },
      {
        sigla: 'EAY4450-003V',
        nombre: 'Etica para el Trabajo',
        asistencias:['Sabado 20/07','Sabado 27/07','Sabado 03/08','Sabado 10/08'],
        estados:['Presente','Presente','Ausente','Presente'],
        totClases:4,
        clasesAsistidas:3
      }
    ];
  }

  volver() {
    this.NavController.back();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

}
