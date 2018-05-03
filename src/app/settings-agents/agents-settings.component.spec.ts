import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsSettingsComponent } from './agents-settings.component';

describe('AgentsSettingsComponent', () => {
  let component: AgentsSettingsComponent;
  let fixture: ComponentFixture<AgentsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
