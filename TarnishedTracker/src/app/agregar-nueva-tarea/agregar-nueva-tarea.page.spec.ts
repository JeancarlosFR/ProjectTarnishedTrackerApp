import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { AgregarNuevaTareaPage } from './agregar-nueva-tarea.page';

describe('AgregarNuevaTareaPage', () => {
  let component: AgregarNuevaTareaPage;
  let fixture: ComponentFixture<AgregarNuevaTareaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarNuevaTareaPage],
      imports: [IonicModule.forRoot()],
      providers: [ModalController],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarNuevaTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
