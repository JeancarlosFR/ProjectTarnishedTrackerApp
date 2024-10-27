import { Component, OnInit, inject } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  
})
export class AttendancePage implements OnInit {

  NavController = inject(NavController);
  MenuController = inject(MenuController);

  constructor() { }

  ngOnInit() { }

  volver() {
    this.NavController.back();
  }

  closeMenu() {
    this.MenuController.close();
  }

  
}


