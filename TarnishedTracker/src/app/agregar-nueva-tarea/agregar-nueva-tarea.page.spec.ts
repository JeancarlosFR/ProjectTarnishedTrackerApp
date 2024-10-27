import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarNuevaTareaPage } from './agregar-nueva-tarea.page';

describe('AgregarNuevaTareaPage', () => {
  let component: AgregarNuevaTareaPage;
  let fixture: ComponentFixture<AgregarNuevaTareaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarNuevaTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
