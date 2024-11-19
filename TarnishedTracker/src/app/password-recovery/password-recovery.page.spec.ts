import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PasswordRecoveryPage } from './password-recovery.page';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utils.service';

// Paso 1: Crear los mocks
const mockFirebaseService = {
  sendRecoveryEmail: jasmine.createSpy('sendRecoveryEmail').and.returnValue(Promise.resolve()),
  
};

const mockUtilsService = {
  loading: jasmine.createSpy('loading').and.returnValue(
    Promise.resolve({
      present: jasmine.createSpy('present'),
      dismiss: jasmine.createSpy('dismiss'),
    })
  ),
  presentToast: jasmine.createSpy('presentToast'),
  routerLink: jasmine.createSpy('routerLink'),
};

describe('PasswordRecoveryPage', () => {
  let component: PasswordRecoveryPage;
  let fixture: ComponentFixture<PasswordRecoveryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordRecoveryPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService }, // Usa el mock
        { provide: UtilsService, useValue: mockUtilsService },       // Usa el mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordRecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendRecoveryEmail when form is valid', async () => {
    component.form.controls['email'].setValue('test@example.com');
    await component.submit();
    expect(mockFirebaseService.sendRecoveryEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockUtilsService.presentToast).toHaveBeenCalledWith(jasmine.objectContaining({ message: 'Correo enviado con éxito' }));
    expect(mockUtilsService.routerLink).toHaveBeenCalledWith('/home');
  });

});
