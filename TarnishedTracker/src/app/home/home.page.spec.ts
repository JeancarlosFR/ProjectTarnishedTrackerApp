import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utils.service';
import { HomePage } from './home.page';

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
  presentToast: jasmine.createSpy('presentToast'),
  routerLink: jasmine.createSpy('routerLink'),
};


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService }, // Usa el mock
        { provide: UtilsService, useValue: mockUtilsService },       // Usa el mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
