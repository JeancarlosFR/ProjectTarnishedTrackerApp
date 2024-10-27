//AQUÍ SE UTILIZÁN LAS FUNCIONES DE FIREBASE

import { inject, Injectable } from '@angular/core';

//PARA FUNCIONES DE AUTENTICACIÓN
import { AngularFireAuth } from '@angular/fire/compat/auth';
//PARA LOGUEAR
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../_models/user.model';
//PARA FUNCIONES FIRESTORE DATABASE
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  //CODIGO PARA INJECTAR CLASES DE AUTENTICACION
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  //=========AUTENTICACIÓN
  getAuth() {
    return getAuth();
  }

  //=========FUNCION PARA ACCEDER
  singIn(user: User) {
    //ESTO RECIBE EL GETAUTH() Y DOS PARAMETROS CREADOS EN USER.MODEL.TS
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //=========FUNCION PARA REGISTRAR
  singUp(user: User) {
    //ESTO RECIBE EL GETAUTH() Y DOS PARAMETROS CREADOS EN USER.MODEL.TS
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }


  //ACTUALIZAR USUARIO
  updateUser(displayName: string) {
    //ESTA FUNCION RETORNA EL USUARIO ACTUAL QUE SE ESTA ACTUALIZANDO
    return updateProfile(getAuth().currentUser, { displayName });
  }

  //CERRAR SESIÓN
  singOut() {
    getAuth().signOut();
    //PARA CERRAR SESIÓN POR COMPLETO SE DEBE QUITAR AL USUARIO DEL LOCALSTORAGE Y SE HACE CON REMOVE ITEM
    localStorage.removeItem('user');
    //CON ESTO SE REDIRIGE A LA PAGINA DE LOGUEO
    this.utilsSvc.routerLink('/home');
  }

  //==========================================BASE DE DATOS==========================================

  //PARA CREAR DOCUMENTOS EN LA BASE DE DATOS SE UTILIZARÁ ESTA FUNCIÓN PARA SETEAR DOCUMENTOS SI NO EXISTEN O REMPLAZARLOS
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data); //
  }

  //FUNCIÓN PARA OBTENER LOS DOCUMENTOS DEL USUARIO
  async getDocument(path: string) {
    //CON ESTA FUNCIÓN SE SACA LA INFORMACIÓN DEL USUARIO DE LA BASE DE DATOS
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //ENVIAR EMAIL PARA RESTABLECER CONTRASEÑA

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
}
