import { Component, OnInit, inject } from '@angular/core';
import { AsistenciaService } from 'src/services/asistencia.service';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html', 
  styleUrls: ['./scanner-qr.page.scss'], 
})
export class ScannerQrPage implements OnInit {
  // Declaración de variables y su tipo
  seccion = ''; // Almacena la sección obtenida del QR.
  codigoSeccion = ''; // Almacena el código de sección del QR.
  fecha = ''; // Almacena la fecha obtenida del QR.
  ScanResult = ''; // Almacena el resultado completo del escaneo en formato de texto.

  
  asistenciaService = inject(AsistenciaService); // Servicio para registrar la asistencia.
  NavController = inject(NavController); // Servicio para la navegación.
  modalController = inject(ModalController); // Servicio para manejar modales.
  platform = inject(Platform); // Servicio para detectar la plataforma (iOS, Android, etc.).
  datos: any | undefined;

  async ngOnInit() {
    // Verifica si la aplicación se está ejecutando en un dispositivo compatible con Capacitor.
    if (this.platform.is('capacitor')) {
      await BarcodeScanner.isSupported(); // Verifica si la lectura de códigos es compatible.
      await BarcodeScanner.checkPermissions(); // Verifica y solicita permisos de cámara.
      await BarcodeScanner.removeAllListeners(); // Remueve cualquier listener previo del escáner.
    }
    try {
      this.datos = await this.asistenciaService.obtenerAsistencia();
      console.log(this.asistenciaService.obtenerAsistencia());
      console.log(this.asistenciaService.obtenerDatos());
    } catch (error: any) {
      console.log(error);
    }
  }

  // Método para abrir el escáner de códigos QR en un modal.
  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent, // Define el componente del modal que realizará el escaneo.
      cssClass: 'barcode-scanning-modal', // Define la clase CSS para estilizar el modal.
      showBackdrop: false, // Indica que no habrá fondo de sombra detrás del modal.
      componentProps: {
        formats: [], // Define los formatos de código que puede escanear (vacío para todos).
        LensFacing: LensFacing.Back, // Define el uso de la cámara trasera para el escaneo.
      },
    });

    await modal.present(); // Muestra el modal de escaneo.

    const { data } = await modal.onWillDismiss(); // Obtiene los datos escaneados cuando el modal se cierra.

    if (data) {
      this.ScanResult = data?.barcode?.displayValue; // Guarda el valor escaneado en `ScanResult`.

      try {
        // Convierte el valor escaneado de texto a JSON.
        const datosQR = JSON.parse(this.ScanResult);
        this.seccion = datosQR.seccion; // Asigna la sección obtenida del QR.
        this.codigoSeccion = datosQR.codigoSeccion; // Asigna el código de sección del QR.
        this.fecha = datosQR.fecha; // Asigna la fecha obtenida del QR.
      } catch (error) {
        console.error('Error procesando el QR:', error); // Captura y muestra en consola cualquier error en el procesamiento.
      }
    }
  }

  volver() {
    this.NavController.back(); 
  }
}
