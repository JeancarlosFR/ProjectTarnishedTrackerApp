import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { lastValueFrom, timer } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/_models/user.model';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  NavController = inject(NavController);
  toastController = inject(ToastController);
  loadSrv = inject(LoadingController);

  //VARIABLES QUE INJECTARAN LOS SERVICIOS DE FIREBASE Y UTILS
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  //FUNCIÓN PARA ENVIAR EL FORMULARIO
  async submit() {
    //SE ENVIAN LOS DATOS DEL LOGIN
    if (this.form.valid) {
      //CONSTANTE QUE TRAERA EL LOADING UTILS CUANDO INICIA LA FUNCIÓN SUBMIT
      const loading = await this.utilsSvc.loading();
      await loading.present();

      //SE PASA EL EMAIL DEL USUARIO
      this.firebaseSvc
        .sendRecoveryEmail(this.form.value.email)
        .then((res) => {
          //VALIDACION DE ERRORES
          this.utilsSvc.presentToast({
            message: 'Correo enviado con éxito', //MENSAJE DE ERROR DE FIREBASE
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'mail-outline',
          });
          this.utilsSvc.routerLink('/home');
          this.form.reset();
        })
        .catch((error) => {
          console.log(error);
          //SE MUESTRA EL ERROR DENTRO DEL TOAST. SE ASIGNAN PROPIEDADES
          this.utilsSvc.presentToast({
            message: error.message, //MENSAJE DE ERROR DE FIREBASE
            duration: 2000,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });

          //SE QUITA EL LOADING CUANDO TERMINA LA PETICIÓN
        })
        .finally(() => {
          //CUANDO SE TERMINA DE EJECUTAR LA PETICIÓN SE QUITA EL LOADING
          loading.dismiss();
        });
    }
  }
}
