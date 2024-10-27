import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TareasPage } from '../tareas/tareas.page';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-nueva-tarea',
  templateUrl: './agregar-nueva-tarea.page.html',
  styleUrls: ['./agregar-nueva-tarea.page.scss'],
})
export class AgregarNuevaTareaPage implements OnInit {

  MenuController=inject(MenuController);

  categorias = ['trabajo', 'evaluacion', 'tarea']

  newTaskObject={}

  nombreTarea: string = ''; 
  fechaTarea: string = ''; 
  prioridadTarea: string = ''; 
  categoriaTarea: string = ''; 

  taskObject={}

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closed() {
    // Verifica que taskObject tiene los datos correctos antes de cerrarse
    await this.modalCtrl.dismiss(this.taskObject);
  }


  selectCategory(index: number){
    this.categoriaTarea = this.categorias[index]
  }

 // Métodos en AgregarNuevaTareaPage
addTarea() {
  // Se asegura de que las propiedades estén definidas 
  this.taskObject = {
    nombreItem: this.nombreTarea,
    fechaItem: this.fechaTarea,
    prioridadItem: this.prioridadTarea,
    categoriaItem: this.categoriaTarea,
  };

  // Se cierra el modal y se envía el objeto taskObject
  this.closed();
}
closeMenu() {
  this.MenuController.close();
}

}
