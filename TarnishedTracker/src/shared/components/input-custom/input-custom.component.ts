import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.scss'],
})
export class InputCustomComponent  implements OnInit {

  //El componente necesita parametro de entrada que será @Input: control que estará sin inicializar y será tipo FormControl
  @Input() control!: FormControl;
  //Tipo de input que se utilizará
  @Input() type!: string;
  //identificar el input en el que estamos escribiendoi
  @Input() label!: string;
  //Parametro para autocompletar el Input
  @Input() autocomplete!: string;
  //Parametro Icon para identificar el input con imagen
  @Input() icon!: string; 

  //Variables para la contraseña
  //CON ESTO SE IDENTIFICA SI LA VAR ES TIPO PASSWORD y MOSTRARÁ EL OJITO
  isPassword!: boolean;
  //ESTO DECLRA SI LA CONTRASEÑA ESTARÁ OCULTA O NO
  hide: boolean=true;

  constructor() { }

  ngOnInit() {
    //SI TYPE ES IGUAL A PASSWORD isPassowrd=true
    if(this.type=='password') this.isPassword=true;
  }

  //Servirá para mostrar u ocultar la contraseña
  showOrHidePassword(){
    //SI LA PERSONA PRESIONA EL BOTON SERÁ DE TRUE A FALSE Y VICEVERSA
    this.hide=!this.hide;
    //SI HIDE==TRUE ENTONCES EL TYPE SERÁ PASSWORD Y SI NO SERÁ TEXT
    if(this.hide) this.type='password';
    else this.type='text';  

  }

}
