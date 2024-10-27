import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  exports: [MatSlideToggleModule,MatDividerModule]
})
export class ComponentsModule { }
