import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/_models/user.model';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //SE CREA LA VARIABLE FORM CON LOS CAMPOS EMAIL Y PASSWORD CON VALI
  form= new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  })

  NavController = inject(NavController);
  toastController = inject(ToastController);
  loadSrv = inject(LoadingController);

  //VARIABLES QUE INJECTARAN LOS SERVICIOS DE FIREBASE Y UTILS
  firebaseSvc=inject(FirebaseService);
  utilsSvc=inject(UtilsService);




  //FUNCIÓN PARA ENVIAR EL FORMULARIO
  async submit(){
    //SE ENVIAN LOS DATOS DEL LOGIN
    if(this.form.valid){
      //CONSTANTE QUE TRAERA EL LOADING UTILS CUANDO INICIA LA FUNCIÓN SUBMIT
      const loading = await this.utilsSvc.loading();
      await loading.present();


      //FOMULARIO COMO USUARIO Y DEVUELVE RESPUESTA POR CONSOLA
      this.firebaseSvc.singIn(this.form.value as User).then(res =>{

        
        this.getUserInfo(res.user.uid);

        //VALIDACION DE ERRORES 
      }).catch(error =>{

        console.log(error);
        //SE MUESTRA EL ERROR DENTRO DEL TOAST. SE ASIGNAN PROPIEDADES 
        this.utilsSvc.presentToast({
          message: error.message, //MENSAJE DE ERROR DE FIREBASE
          duration: 2000,
          color:'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })

        //SE QUITA EL LOADING CUANDO TERMINA LA PETICIÓN
      }).finally(() =>{
        //CUANDO SE TERMINA DE EJECUTAR LA PETICIÓN SE QUITA EL LOADING
        loading.dismiss();

      })
    }
  }

  async getUserInfo(uid:string){
    //SE ENVIAN LOS DATOS DEL LOGIN
    if(this.form.valid){
      //CONSTANTE QUE TRAERA EL LOADING UTILS CUANDO INICIA LA FUNCIÓN SUBMIT
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      //FOMULARIO COMO USUARIO Y DEVUELVE RESPUESTA POR CONSOLA
      this.firebaseSvc.getDocument(path).then( (user:User) =>{

        this.utilsSvc.saveInLocalStorage('user', user);
        this.utilsSvc.routerLink('/inicio');
        this.form.reset();

        this.utilsSvc.presentToast({
          message: `Welcome Tarnished ${user.name}`, 
          duration: 2000,
          color:'primary',
          position: 'bottom',
          icon: 'person-circle-outline'
        })

        //VALIDACION DE ERRORES
      }).catch(error =>{

        console.log(error);
        //SE MUESTRA EL ERROR DENTRO DEL TOAST. SE ASIGNAN PROPIEDADES 
        this.utilsSvc.presentToast({
          message: error.message, //MENSAJE DE ERROR DE FIREBASE
          duration: 2000,
          color:'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })

        //SE QUITA EL LOADING CUANDO TERMINA LA PETICIÓN
      }).finally(() =>{
        //CUANDO SE TERMINA DE EJECUTAR LA PETICIÓN SE QUITA EL LOADING
        loading.dismiss();

      })
    }
    

  }

}
  

