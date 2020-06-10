import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IspDetailComponent } from './isp-detail.component';

describe('IspDetailComponent', () => {
  let component: IspDetailComponent;
  let fixture: ComponentFixture<IspDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IspDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IspDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
