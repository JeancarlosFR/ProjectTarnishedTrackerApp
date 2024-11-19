import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/_models/user.model';
import { UtilsService } from 'src/services/utils.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],

})
export class RegisterPage {
  
  

  
  //SE CREA LA VARIABLE FORM PARA REGISTRAR A UN NUEVO USUARIO
  form= new FormGroup({
    
    uid: new FormControl(''), //EL UID SE OBTIENE DE LA RESPUESTA AL CREAR UN NUEVO USUARIO
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    carrera: new FormControl('', [Validators.required, Validators.minLength(4)])

  })

  NavController = inject(NavController);
  

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
      this.firebaseSvc.singUp(this.form.value as User).then( async res =>{

        //UNA VEZ CREADO EL NUEVO USUARIO CON ESTA FUNCIÓN SE ACTUALIZA EL NOMBRE
        await this.firebaseSvc.updateUser(this.form.value.name);
        //VARIABLE UID QUE RECIBE LA RESPUESTA AL CREAR EL USUARIO
        let uid = res.user.uid;
        //PARA GUARDAR EL UDI DENTRO DEL FORMULARIO 
        this.form.controls.uid.setValue(uid);
        //SE LLAMA A LA FUNCIÓN SET USER INFO PARA GUARDAR LOS DATOS EN LA BASE DE DATOS 
        this.setUserInfo(uid);

        

        //VALIDACION DE ERRORES
      }).catch(error =>{

        console.log(error);
        //SE MUESTRA EL ERROR DENTRO DEL TOAST. SE ASIGNAN PROPIEDADES 
        this.utilsSvc.presentToast({
          message: error.message, //MENSAJE DE ERROR DE FIREBASE
          duration: 2000,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

        //SE QUITA EL LOADING CUANDO TERMINA LA PETICIÓN
      }).finally(() =>{
        //CUANDO SE TERMINA DE EJECUTAR LA PETICIÓN SE QUITA EL LOADING
        loading.dismiss();

      })
    }
    

  }
  //ESTA FUNCIÓN RECIBE EL UID DEL USUARIO AUTENTICADO
  async setUserInfo(uid:string){
    //SE ENVIAN LOS DATOS DEL LOGIN
    if(this.form.valid){
      //CONSTANTE QUE TRAERA EL LOADING UTILS CUANDO INICIA LA FUNCIÓN SUBMIT
      const loading = await this.utilsSvc.loading();
      await loading.present();

      //EN USERS SE GUARDA LA INFORMACIÓN DEL USUARIO 
      let path = `users/${uid}`;
      /*LA CONTRASEÑA NO DEBE QUEDAR GUARDADA EN LA DATA POR LO QUE SE BORRA DEL FORMULARIO
      DE ESTA MANERA NO SE ENVIA A LA BASE DE DATOS*/
      delete this.form.value.password;


      //PATH ES LA RUTA DONDE SE GUARDA LA INFORMACIÓN DEL USUARIO Y LA DATA GUARDADA ES LA DEL FORMULARIO DEL REGISTRO
      this.firebaseSvc.setDocument(path, this.form.value).then( async res =>{
        //SE GUARDAN LOS DATOS DEL USUARIO EN EL LOCAL STORAGE USER Y EL FORMULARIO DE REGISTRO
        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/inicio');
        this.form.reset();

        //VALIDACION DE ERRORES
      }).catch(error =>{

        console.log(error);
        //SE MUESTRA EL ERROR DENTRO DEL TOAST. SE ASIGNAN PROPIEDADES 
        this.utilsSvc.presentToast({
          message: error.message, //MENSAJE DE ERROR DE FIREBASE
          duration: 2000,
          color:'primary',
          position: 'middle',
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

