import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';


import { IonicModule } from '@ionic/angular';

import { AgregarNuevaTareaPageRoutingModule } from './agregar-nueva-tarea-routing.module';

import { AgregarNuevaTareaPage } from './agregar-nueva-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarNuevaTareaPageRoutingModule,
    MatDividerModule
  ],
  declarations: [AgregarNuevaTareaPage]
})
export class AgregarNuevaTareaPageModule {}
