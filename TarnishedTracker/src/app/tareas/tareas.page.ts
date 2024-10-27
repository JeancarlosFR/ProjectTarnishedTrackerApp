import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarNuevaTareaPageModule } from '../agregar-nueva-tarea/agregar-nueva-tarea.module';
import { AgregarNuevaTareaPage } from '../agregar-nueva-tarea/agregar-nueva-tarea.page';
import { MenuController } from '@ionic/angular';
import { NavController} from '@ionic/angular';



interface Tarea {
  nombreItem: string;
  fechaItem: string; 
  prioridadItem: string;
  categoriaItem: string;
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})



export class TareasPage implements OnInit {

  menuCtrl = inject(MenuController);
  NavController = inject(NavController);


  todoList: Tarea[] = [];

  
  /*[{
    //ITEM 1
    name: 'Desarrollo de App Moviles',
    date: '09-08-2024',
    priority: 'Alta',
    category: 'Evaluación 1'


  },
  {
    //ITEM 2
    name: 'Calidad de software',
    date: '09-25-2024',
    priority: 'Baja',
    category: 'Charla'





  },
  {
    //ITEM 3
    name: 'Etica',
    date: '09-25-2024',
    priority: 'Media',
    category: 'Evaluación 1'

  },
  {
    //ITEM 4
    name: 'Ingles',
    date: '09-26-2024',
    priority: 'Baja',
    category: 'Quiz 1'

  }



]
 */ 
  //Se almacena la fecha actual que tenemos
  fechaActual : number = Date.now();

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  //METODO PARA AGREGAR TAREAS
// 
async agregarTareas() {
  const modal = await this.modalCtrl.create({
    component: AgregarNuevaTareaPage,
  });

  modal.onDidDismiss().then((newTaskObject) => {
    // Verificar que `newTaskObject.data` tenga la estructura de `Tarea`
    if (newTaskObject.data && 'nombreItem' in newTaskObject.data && 'fechaItem' in newTaskObject.data &&
        'prioridadItem' in newTaskObject.data && 'categoriaItem' in newTaskObject.data) {
      this.todoList.push(newTaskObject.data as Tarea);
    } else {
      console.error('La nueva tarea no tiene la estructura correcta:', newTaskObject.data);
    }
  });
  

  return await modal.present();
}


  delete(index: number){

    this.todoList.splice(index, 1)

  }

  volver() {
    this.NavController.back();
  }
  closeMenu() {
    this.menuCtrl.close();
  }
  
  

}
