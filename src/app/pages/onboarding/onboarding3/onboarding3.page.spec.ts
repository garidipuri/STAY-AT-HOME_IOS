import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Onboarding3Page } from './onboarding3.page';

describe('Onboarding3Page', () => {
  let component: Onboarding3Page;
  let fixture: ComponentFixture<Onboarding3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Onboarding3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Onboarding3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
