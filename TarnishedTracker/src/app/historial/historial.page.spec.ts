import { AsistenciaService } from 'src/services/asistencia.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialPage } from './historial.page';
import { Seccion } from 'src/_models/seccion';  // Asegúrate de importar los modelos correctos
import { MenuController, NavController } from '@ionic/angular';
import { of } from 'rxjs'; // Para crear un observable simulado

// Mock del servicio AsistenciaService
const mockAsistenciaService = {
  obtenerListaAsistencia: jasmine.createSpy('obtenerListaAsistencia').and.returnValue(of([  // Simulando un observable
    {
      seccion: 'PDY12586',
      asistencia: [
        { asistido: true, fecha: '2024-11-01' },
        { asistido: false, fecha: '2024-11-02' },
      ]
    },
    {
      seccion: 'PDY13548',
      asistencia: [
        { asistido: true, fecha: '2024-11-01' },
      ]
    }
  ])), // Aquí estamos simulando la respuesta del servicio con algunas secciones
};

describe('HistorialPage', () => {
  let component: HistorialPage;
  let fixture: ComponentFixture<HistorialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialPage],
      imports: [],  // No necesitas importar AsistenciaService aquí
      providers: [
        { provide: AsistenciaService, useValue: mockAsistenciaService },
        { provide: NavController, useValue: {} },  // Mock del NavController
        { provide: MenuController, useValue: {} }, // Mock del MenuController
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
