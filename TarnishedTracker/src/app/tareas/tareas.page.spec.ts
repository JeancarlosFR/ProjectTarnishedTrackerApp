import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TareasPage } from './tareas.page';

const mockModalController = {
  create: jasmine.createSpy('create').and.returnValue({
    present: jasmine.createSpy('present'),
    onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve()),
  }),
}

describe('TareasPage', () => {
  let component: TareasPage;
  let fixture: ComponentFixture<TareasPage>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [TareasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: mockModalController }, // Usa el mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
