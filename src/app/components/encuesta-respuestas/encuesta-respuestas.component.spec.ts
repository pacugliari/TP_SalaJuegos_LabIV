import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaRespuestasComponent } from './encuesta-respuestas.component';

describe('EncuestaRespuestasComponent', () => {
  let component: EncuestaRespuestasComponent;
  let fixture: ComponentFixture<EncuestaRespuestasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaRespuestasComponent]
    });
    fixture = TestBed.createComponent(EncuestaRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
