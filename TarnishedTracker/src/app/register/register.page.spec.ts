import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utils.service';

// Crear mocks de los servicios
const mockFirebaseService = {
  singUp: jasmine.createSpy('singUp').and.returnValue(Promise.resolve({ user: { uid: 'test-uid' } })),
  updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve()),
  setDocument: jasmine.createSpy('setDocument').and.returnValue(Promise.resolve()),
};

const mockUtilsService = {
  loading: jasmine.createSpy('loading').and.returnValue(Promise.resolve({ present: jasmine.createSpy(), dismiss: jasmine.createSpy() })),
  presentToast: jasmine.createSpy('presentToast'),
  saveInLocalStorage: jasmine.createSpy('saveInLocalStorage'),
  routerLink: jasmine.createSpy('routerLink'),
};

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: UtilsService, useValue: mockUtilsService },
        NavController,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a singUp y updateUser cuando el formulario sea valido y enviado', async () => {
    // Simular datos válidos en el formulario
    component.form.setValue({
      uid: '',
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      carrera: 'Software Engineering',
    });

    await component.submit();

    // Verificar que los métodos de FirebaseService fueron llamados
    expect(mockFirebaseService.singUp).toHaveBeenCalledWith(jasmine.objectContaining({ email: 'test@example.com', password: 'password123' }));
    expect(mockFirebaseService.updateUser).toHaveBeenCalledWith('Test User');
  });

  it('debe llamar setDocument y saveInLocalStorage cuando el usuario se registre de manera exitosa', async () => {
    component.form.setValue({
      uid: '',
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      carrera: 'Software Engineering',
    });

    await component.submit();

    // Verificar que `setDocument` fue llamado con la ruta correcta
    expect(mockFirebaseService.setDocument).toHaveBeenCalledWith('users/test-uid', jasmine.objectContaining({ email: 'test@example.com' }));

    // Verificar que los datos se guardaron en el localStorage
    expect(mockUtilsService.saveInLocalStorage).toHaveBeenCalledWith('user', jasmine.objectContaining({ email: 'test@example.com' }));
  });
  

});
