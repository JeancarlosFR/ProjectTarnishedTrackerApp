import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/services/firebase.service';
import { ScannerQrPage } from './scanner-qr.page';

const mockHttpClient = {
  httpCliente: jasmine.createSpy('httpCliente').and.returnValue(Promise.resolve()),
};

const mockFireBAseService = {
  getAuth: jasmine.createSpy('getAuth').and.returnValue(Promise.resolve()),
};

describe('ScannerQrPage', () => {
  let component: ScannerQrPage;
  let fixture: ComponentFixture<ScannerQrPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScannerQrPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: HttpClient, useValue:mockHttpClient }, // Usa el mock
        { provide: FirebaseService, useValue: mockFireBAseService }, // Usa el mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
