import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorPage } from './indicador.page';

describe('IndicadorPage', () => {
  let component: IndicadorPage;
  let fixture: ComponentFixture<IndicadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
