import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarNuevaTareaPage } from './agregar-nueva-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarNuevaTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarNuevaTareaPageRoutingModule {}
