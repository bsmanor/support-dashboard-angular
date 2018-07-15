import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZendeskStatsComponent } from './zendesk-stats.component';

describe('ZendeskStatsComponent', () => {
  let component: ZendeskStatsComponent;
  let fixture: ComponentFixture<ZendeskStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZendeskStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZendeskStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
