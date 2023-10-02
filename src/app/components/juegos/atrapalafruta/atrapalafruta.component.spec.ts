import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrapalafrutaComponent } from './atrapalafruta.component';

describe('AtrapalafrutaComponent', () => {
  let component: AtrapalafrutaComponent;
  let fixture: ComponentFixture<AtrapalafrutaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtrapalafrutaComponent]
    });
    fixture = TestBed.createComponent(AtrapalafrutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
