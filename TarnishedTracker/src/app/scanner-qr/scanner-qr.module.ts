import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';


import { IonicModule } from '@ionic/angular';

import { ScannerQrPageRoutingModule } from './scanner-qr-routing.module';

import { ScannerQrPage } from './scanner-qr.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerQrPageRoutingModule,
    MatDividerModule,
  ],
  declarations: [ScannerQrPage,BarcodeScanningModalComponent]
})
export class ScannerQrPageModule {}
