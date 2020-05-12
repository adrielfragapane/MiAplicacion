import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePropuestaComponent } from './detalle-propuesta.component';

describe('DetallePropuestaComponent', () => {
  let component: DetallePropuestaComponent;
  let fixture: ComponentFixture<DetallePropuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePropuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
