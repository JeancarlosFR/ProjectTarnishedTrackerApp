import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';

import { PasswordRecoveryPageRoutingModule } from './password-recovery-routing.module';

import { PasswordRecoveryPage } from './password-recovery.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordRecoveryPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [PasswordRecoveryPage],
})
export class PasswordRecoveryPageModule {}
