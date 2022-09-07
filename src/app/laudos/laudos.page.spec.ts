import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudosPage } from './laudos.page';

describe('LaudosPage', () => {
  let component: LaudosPage;
  let fixture: ComponentFixture<LaudosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaudosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaudosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
