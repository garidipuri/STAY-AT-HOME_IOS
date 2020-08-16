import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Onboarding2Page } from './onboarding2.page';

describe('Onboarding2Page', () => {
  let component: Onboarding2Page;
  let fixture: ComponentFixture<Onboarding2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Onboarding2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Onboarding2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
