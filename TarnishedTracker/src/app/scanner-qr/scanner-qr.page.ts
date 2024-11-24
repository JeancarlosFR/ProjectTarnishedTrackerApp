import { Component, OnInit, inject } from '@angular/core';
import { AsistenciaService } from 'src/services/asistencia.service';
import { ModalController, Platform, NavController, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import jsQR from 'jsqr';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQrPage implements OnInit {
  // Declaración de variables y su tipo
  seccion = '';
  code = '';
  fecha = '';
  ScanResult = '';
  seccionQr = '';
  codigoSeccionQr = '';
  qrApi = '';
  
  asistenciaService = inject(AsistenciaService);
  toastCtrl = inject(ToastController);

  NavController = inject(NavController);
  modalController = inject(ModalController);
  platform = inject(Platform);
  datos: any | undefined;

  async ngOnInit() {

    

    if (this.platform.is('capacitor')) {
      await BarcodeScanner.isSupported();
      await BarcodeScanner.checkPermissions();
      await BarcodeScanner.removeAllListeners();
    }
    try {
      
      this.datos = await this.asistenciaService.obtenerListaAsistencia();
      console.log(this.asistenciaService.obtenerListaAsistencia);
      console.log(this.datos);
    } catch (error: any) {
      console.log(error);
    }
  }

  async startScan() {

    if (this.platform.is('capacitor')) {
      // Escaneo con la cámara en dispositivos móviles
      const modal = await this.modalController.create({
        component: BarcodeScanningModalComponent,
        cssClass: 'barcode-scanning-modal',
        showBackdrop: false,
        componentProps: {
          formats: [],
          LensFacing: LensFacing.Back,
        },
      });

      await modal.present();

      const { data } = await modal.onWillDismiss();

      if (data) {
        this.ScanResult = data?.barcode?.displayValue;

          const datosQR = JSON.parse(this.ScanResult);
          this.seccion = datosQR.seccion;
          this.code = datosQR.code;
          this.fecha = datosQR.fecha;
        
      }
    } else {
      // Cargar una imagen en navegadores web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const imageBitmap = await this.readImage(file);
          const qrData = this.decodeQRFromImage(imageBitmap);

          if (qrData) {
            try {
              const datosQR = JSON.parse(qrData);
              this.seccion = datosQR.seccion;
              this.code = datosQR.code;
              this.fecha = datosQR.fecha;

                // Llamar a registrarAsistencia con los datos
                const response = await this.asistenciaService.registrarAsistencia(datosQR);
                
                console.log('Respuesta de la API:', response);
                
            } catch (response) {
              
            }
          } else {
            console.error('No se detectó ningún código QR en la imagen.');
          }
        }
      };

      input.click(); // Abre el selector de archivos automáticamente.
    }
  }

  volver() {
    this.NavController.back();
  }

  // Método para leer una imagen y convertirla en ImageBitmap
  async readImage(file: File): Promise<ImageBitmap> {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        const img = new Image();
        img.src = fileReader.result as string;
        img.onload = () => resolve(createImageBitmap(img));
        img.onerror = reject;
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  }

  // Método para decodificar el QR desde una imagen
  decodeQRFromImage(imageBitmap: ImageBitmap): string | null {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);
    return code ? code.data : null;
  }
}
