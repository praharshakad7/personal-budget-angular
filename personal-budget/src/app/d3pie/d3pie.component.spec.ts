import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3pieComponent } from './d3pie.component';

describe('D3pieComponent', () => {
  let component: D3pieComponent;
  let fixture: ComponentFixture<D3pieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [D3pieComponent]
    });
    fixture = TestBed.createComponent(D3pieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
