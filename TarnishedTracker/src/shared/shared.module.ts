import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCustomComponent } from './components/input-custom/input-custom.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';


//PARA QUE LOS COMPONENTES SE COMPARTAN SE CREA EL NUEVO ARREGLO EXPORTS Y SE IMPORTAN EN DECLARATIONS Y EXPORTS
@NgModule({
  declarations: [InputCustomComponent, LogoComponent],
  exports:[InputCustomComponent,LogoComponent],
  //PARA QUE LOS COMPONENTES FUNCIONEN BIEN HAY QUE IMPORTAR MODULOS
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule
  ]
})
export class SharedModule { }
