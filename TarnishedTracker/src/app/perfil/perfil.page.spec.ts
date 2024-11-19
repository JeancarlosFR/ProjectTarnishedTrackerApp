import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from 'src/services/firebase.service';
import { PerfilPage } from './perfil.page';

const mockFirebaseService = {
  singOut: jasmine.createSpy('singOut').and.returnValue(Promise.resolve()),
};

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilPage],
      providers: [{ provide: FirebaseService, useValue: mockFirebaseService }],
    }).compileComponents

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
