import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';




//MODULOS PARA FORMULARIO
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
//MODULO PARA TRABAJAR CON FORMULARIOS REACTIVOS
import {ReactiveFormsModule} from '@angular/forms';
//MODULO BUTTON
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from 'src/shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, SharedModule,
    
    ReactiveFormsModule,
],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
