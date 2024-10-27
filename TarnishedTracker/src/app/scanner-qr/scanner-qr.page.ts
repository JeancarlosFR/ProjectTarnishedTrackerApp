import { ScanResult } from './../../../node_modules/@capacitor-mlkit/barcode-scanning/dist/esm/definitions.d';
import { Component, OnInit, inject } from '@angular/core';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FirebaseService } from 'src/services/firebase.service';


@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQrPage implements OnInit {

  NavController = inject(NavController);
  menuCtrl = inject(MenuController);
  ScanResult = "";
  seccion="";
  codigoSeccion:"";
  fecha="";

  

  constructor(
    private modalController: ModalController,
    private platform: Platform) {

  }

  async ngOnInit() {


    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners().then();
    }
  }

  async starScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats:[],
        LensFacing: LensFacing.Back
      }
  });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.ScanResult = data?.barcode?.displayValue;
    }

    try {
      const datosQR = JSON.parse(this.ScanResult);
      this.seccion= datosQR.seccion;
      this.codigoSeccion= datosQR.codigoSeccion;
      this.fecha= datosQR.fecha;
      
    } catch (error) {
      console.error(error);
      
    }
}

  volver() {
    this.NavController.back();
  }

  closeMenu() {
    this.menuCtrl.close();
  }
}
