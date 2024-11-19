import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { InicioPage } from './inicio.page';
import { UtilsService } from 'src/services/utils.service';


const mockFirebaseService = {
  singIn: jasmine.createSpy('singIn').and.returnValue(Promise.resolve()),
  
};


const mockUtilsService = {
  loading: jasmine.createSpy('loading').and.returnValue(
    Promise.resolve({
      present: jasmine.createSpy('present'),
      dismiss: jasmine.createSpy('dismiss'),
    })
  ),
  getFromLocalStorage: jasmine.createSpy('user'),
};

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService }, // Usa el mock
        { provide: UtilsService, useValue: mockUtilsService },       // Usa el mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
