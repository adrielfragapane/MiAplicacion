import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestaNuevaComponent } from './propuestaNueva.component';

describe('DetallePropuestaComponent', () => {
  let component: PropuestaNuevaComponent;
  let fixture: ComponentFixture<PropuestaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropuestaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropuestaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
